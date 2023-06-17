import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import pocketbaseServer from "@/lib/pocketbase-server";

export default async function Page() {
  const pocketbase = pocketbaseServer();

  const data = await pocketbase?.collection("user_settings").getFullList();

  const history_retension = data?.find(
    (item) => item.key === "history_retension"
  );

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">User Account Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Save History For days</CardTitle>
          </CardHeader>
          <CardContent>
            <Input defaultValue={history_retension?.value} type="text" />
            <Button className="mt-4">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
