import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import db from "@/db";
import { history } from "@/db/schema";
import { columns as approvedColumns } from "@/utils/columns/approved-vouchers";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { columns as userHistosy } from "@/utils/columns/user-history";
import { Label } from "@/components/ui/label";
import { eq } from "drizzle-orm";
import moment from "moment";

type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const id = searchParams.id as string;

  const historyResponse = await db.query.history.findMany({
    with: {
      user: true,
    },
    where: eq(history.userId, id),
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 gap-4">
        <Card className="h-fit w-fit">
          <CardHeader>
            <CardTitle>{historyResponse[0]?.user.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={historyResponse[0]?.user?.email}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Phone</Label>
              <Input
                type="number"
                id="phone"
                placeholder="Phone"
                value={historyResponse[0]?.user?.mobile}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
        </TabsList>
        <TabsContent value="history">
          <DataTable columns={userHistosy} data={historyResponse} />
        </TabsContent>
        <TabsContent value="rewards">
          <DataTable columns={approvedColumns} data={[]} />
        </TabsContent>
        <TabsContent value="requests">
          <DataTable columns={requestColumns} data={[]} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
