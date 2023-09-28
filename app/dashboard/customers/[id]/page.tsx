import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/db";
import { apps, history, requests, users, vouchers } from "@/db/schema";
import { columns as approvedColumns } from "@/utils/columns/approved-vouchers";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { columns as appColumns } from "@/utils/columns/apps-columns";
import { columns as userHistosy } from "@/utils/columns/user-history";
import { Label } from "@/components/ui/label";
import { and, desc, eq } from "drizzle-orm";
import moment from "moment";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const id = params.id as string;

  const historyResponse = await db.query.history.findMany({
    with: {
      user: true,
    },
    where: eq(history.userId, id),
  });

  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  const userApps = await db.query.apps.findFirst({
    where: eq(apps.userId, id),
  });

  const requestsResponse = await db.query.requests.findMany({
    where: and(eq(requests.userId, id), eq(requests.status, "pending")),
    with: {
      user: {
        with: {
          usage: true,
        },
      },
      milestones: true,
    },
    orderBy: desc(requests.createdAt),
  });

  const vouchersResponse = await db.query.vouchers.findMany({
    where: eq(vouchers.userId, id),
    orderBy: desc(vouchers.createdAt),
    with: {
      user: true,
    },
  });

  if (!user) return redirect("/dashboard/customers");

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 gap-4">
        <Card className="h-fit w-fit">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={historyResponse[0]?.user?.email}
                disabled
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Phone</Label>
              <Input
                type="number"
                id="phone"
                placeholder="Phone"
                value={historyResponse[0]?.user?.mobile || "N/A"}
                disabled
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Register At</Label>
              <Input
                type="text"
                id="created"
                placeholder="Register At"
                value={moment(historyResponse[0]?.user?.createdAt).format(
                  "DD/MM/YYYY"
                )}
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="history" className="mt-8">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="apps">Apps</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <DataTable columns={userHistosy} data={historyResponse} />
        </TabsContent>
        <TabsContent value="rewards">
          <DataTable columns={approvedColumns} data={vouchersResponse} />
        </TabsContent>
        <TabsContent value="requests">
          <DataTable columns={requestColumns} data={requestsResponse} />
        </TabsContent>
        <TabsContent value="apps">
          <DataTable columns={appColumns} data={userApps?.data} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
