import { DataTable } from "@/components/ui/data-table";
import pocketbaseServer from "@/lib/pocketbase-server";
import { Customers } from "@/types";
import { columns as customerColumns } from "@/utils/columns/customers-columns";

export default async function Page() {
  const pocketbase = pocketbaseServer();

  const customers = (await pocketbase?.collection("users").getFullList({
    sort: "-created",
  })) as Customers[];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <DataTable columns={customerColumns} data={customers} />
    </main>
  );
}
