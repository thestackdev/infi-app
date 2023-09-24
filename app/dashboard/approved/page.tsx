import { DataTable } from "@/components/ui/data-table";
import db from "@/db";
import { requests } from "@/db/schema";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { desc, eq } from "drizzle-orm";

export default async function Page() {
  const approvedRequests = await db.query.requests.findMany({
    with: {
      user: {
        with: {
          usage: true,
        },
      },
    },
    where: eq(requests.status, "approved"),
    orderBy: desc(requests.createdAt),
  });

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <h1 className="text-2xl font-bold mt-8 mb-4">Approved Requests</h1>
          <DataTable columns={requestColumns} data={approvedRequests} />
        </div>
      </main>
    </div>
  );
}
