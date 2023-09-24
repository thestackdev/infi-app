import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function Page() {
  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">User Account Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Save History For days</CardTitle>
          </CardHeader>
          <CardContent>
            <Input defaultValue={30} type="text" />
            <Button className="mt-4">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
