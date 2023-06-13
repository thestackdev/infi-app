import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { columns as voucherColumns } from "@/utils/columns/voucher-settings";

export default function Page() {
  const data = [
    {
      limit: "100 GB",
      type: "DTH",
      company: "Airtel",
    },
    {
      limit: "100 GB",
      type: "Mobile",
      company: "Jio",
    },
    {
      limit: "100 GB",
      type: "DTH",
      company: "Idea",
    },
    {
      limit: "100 GB",
      type: "Mobile",
      company: "Airtel",
    },
    {
      limit: "234 GB",
      type: "DTH",
      company: "Jio",
    },
    {
      limit: "345 GB",
      type: "Mobile",
      company: "Idea",
    },
    {
      limit: "465 GB",
      type: "DTH",
      company: "Airtel",
    },
    {
      limit: "354 GB",
      type: "Mobile",
      company: "Jio",
    },
    {
      limit: "344 GB",
      type: "DTH",
      company: "Idea",
    },
    {
      limit: "400 GB",
      type: "Mobile",
      company: "Airtel",
    },
  ];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Gift Voucher Settings</h1>
      <div className="mt-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
        <Card className="w-full h-fit">
          <CardHeader>Set the limit for Gift voucher</CardHeader>
          <CardContent>
            <div>
              <Label>Data Usages IN GB</Label>
              <Input
                className="mt-2"
                type="number"
                placeholder="Date used in GB"
              />
            </div>
            <RadioGroup defaultValue="option-one" className="flex gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dth" id="option-one" />
                <Label htmlFor="dth">DTH</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="option-two" />
                <Label htmlFor="mobile">Mobile</Label>
              </div>
            </RadioGroup>
            <div className="mt-4">
              <Label>Voucher For</Label>
              <Input
                className="mt-2"
                type="number"
                placeholder="Company name: Ex: Airtel, Jio"
              />
            </div>
          </CardContent>
        </Card>
        <div className="w-full">
          <DataTable columns={voucherColumns} data={data} />
        </div>
      </div>
    </main>
  );
}
