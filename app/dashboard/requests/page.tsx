import { DataTable } from "@/components/ui/data-table";
import db from "@/db";
import { requests } from "@/db/schema";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { desc, eq } from "drizzle-orm";

export default async function Page() {
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

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <DataTable columns={requestColumns} data={recentRequests} />
    </main>
  );
}
