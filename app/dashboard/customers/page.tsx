import { DataTable } from "@/components/ui/data-table";
import db from "@/db";
import { columns as customerColumns } from "@/utils/columns/customers-columns";

export default async function Page() {
  const customers = await db.query.users.findMany();

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <DataTable columns={customerColumns} data={customers} />
    </main>
  );
}
