import { DataTable } from "@/components/ui/data-table";
import pocketbaseServer from "@/lib/pocketbase-server";
import { History } from "@/types";
import { columns as userHistosy } from "@/utils/columns/user-history";
export default async function Page({ params }: any) {
  const pocketbase = pocketbaseServer();

  const resultList = await pocketbase?.collection("history").getList(1, 1000, {
    filter: `user="${params.id}"`,
  });

  const data = resultList?.items.map((item) => {
    return {
      id: item.id,
      url: item.url,
      package_name: item.package_name,
      created: new Date(item.created).toLocaleString(),
    };
  }) as History[];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <DataTable columns={userHistosy} data={data} />
    </main>
  );
}
