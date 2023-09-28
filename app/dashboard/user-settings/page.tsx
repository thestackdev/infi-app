import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import db from "@/db";
import { userSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const response = await db.query.userSettings.findMany();

  async function updateSettings(formData: FormData) {
    "use server";

    await db
      .update(userSettings)
      .set({
        value: formData.get("save_history_for_days") as string,
      })
      .where(eq(userSettings.key, "save_history_for_days"));

    revalidatePath("/dashboard/user-settings");
  }

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">User Account Settings</h1>
      <form
        action={updateSettings}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {response.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.displayName}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input defaultValue={item.value} type="text" name={item.key} />
              <Button className="mt-4">Submit</Button>
            </CardContent>
          </Card>
        ))}
      </form>
    </main>
  );
}
