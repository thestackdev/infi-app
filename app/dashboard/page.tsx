import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import db from "@/db";
import { dataUsage, requests, users } from "@/db/schema";
import { columns as customerColumns } from "@/utils/columns/customers-columns";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { desc, eq, sql } from "drizzle-orm";
import { Check, HardDrive, MessageSquare, Users } from "lucide-react";

export default async function Home() {
  const [{ count: totalCustomers }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const customers = await db.query.users.findMany({
    limit: 10,
  });

  const [{ total: usages }] = await db
    .select({ total: sql<number>`sum(${dataUsage.data})` })
    .from(dataUsage);

  const recentRequests = await db.query.requests.findMany({
    where: eq(requests.status, "pending"),
    with: {
      user: {
        with: {
          usage: true,
        },
      },
      milestones: true,
    },
    orderBy: desc(requests.createdAt),
    limit: 10,
  });

  const [{ count: approvedRequests }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(requests)
    .where(eq(requests.status, "approved"));

  const [{ count: pendingRequests }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(requests)
    .where(eq(requests.status, "pending"));

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-orange-500 rounded-full p-3">
                <Users size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Total Customers</CardTitle>
                <CardDescription>{totalCustomers}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-green-500 rounded-full p-3">
                <HardDrive size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Data Usages</CardTitle>
                <CardDescription>{usages}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-green-500 rounded-full p-3">
                <Check size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Approved Requests</CardTitle>
                <CardDescription>{approvedRequests}</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-orange-500 rounded-full p-3">
                <MessageSquare size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Pending Reuquest</CardTitle>
                <CardDescription>{pendingRequests}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-4">Recent Requests</h1>
        <DataTable columns={requestColumns} data={recentRequests} />
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-4">Recent Customers</h1>
        <DataTable columns={customerColumns} data={customers} />
      </div>
    </main>
  );
}
