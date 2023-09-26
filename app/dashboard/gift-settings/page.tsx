import { createMilestone } from "@/actions/milestones";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import db from "@/db";
import { milestones } from "@/db/schema";
import { columns as voucherColumns } from "@/utils/columns/voucher-settings";
import { desc } from "drizzle-orm";

export default async function Page() {
  const response = await db.query.milestones.findMany({
    orderBy: desc(milestones.createdAt),
  });

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Gift Voucher Settings</h1>
      <form
        action={createMilestone}
        className="mt-4 gap-4 grid grid-cols-1 lg:grid-cols-2"
      >
        <Card className="w-full h-fit">
          <CardHeader>Set the limit for Gift voucher</CardHeader>
          <CardContent>
            <div>
              <Label>Data Usages IN GB</Label>
              <Input
                className="mt-2"
                type="number"
                name="limit"
                placeholder="Date used in GB"
              />
            </div>
            <RadioGroup
              defaultValue="option-one"
              className="flex gap-4 mt-4"
              name="type"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dth" id="option-one" />
                <Label htmlFor="dth">DTH</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="option-two" />
                <Label htmlFor="mobile">Mobile</Label>
              </div>
            </RadioGroup>
            <Button className="mt-8 ml-auto w-full">Save</Button>
          </CardContent>
        </Card>
        <div className="w-full">
          <DataTable columns={voucherColumns} data={response} />
        </div>
      </form>
    </main>
  );
}
