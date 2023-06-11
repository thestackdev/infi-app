import { columns as approvedColumns } from "@/app/approved-vouchers";
import { DataTable } from "@/components/ui/data-table";
import { Vouchers } from "@/types";

export default function Page() {
  const data = [
    {
      id: "1",
      code: "ABC123",
      user: "John",
      details: "Voucher for free movie ticket",
      created: "2023-06-10",
      expires: "2023-06-30",
    },
    {
      id: "2",
      code: "DEF456",
      user: "Jane",
      details: "Voucher for 20% off on clothing",
      created: "2023-06-11",
      expires: "2023-07-15",
    },
    {
      id: "3",
      code: "GHI789",
      user: "Alex",
      details: "Voucher for a free coffee",
      created: "2023-06-12",
      expires: "2023-06-30",
    },
    {
      id: "4",
      code: "JKL012",
      user: "Emily",
      details: "Voucher for $10 off on electronics",
      created: "2023-06-13",
      expires: "2023-07-31",
    },
    {
      id: "5",
      code: "MNO345",
      user: "Michael",
      details: "Voucher for a free dessert",
      created: "2023-06-14",
      expires: "2023-06-30",
    },
    {
      id: "6",
      code: "PQR678",
      user: "Sarah",
      details: "Voucher for 15% off on shoes",
      created: "2023-06-15",
      expires: "2023-07-15",
    },
    {
      id: "7",
      code: "STU901",
      user: "David",
      details: "Voucher for a free smoothie",
      created: "2023-06-16",
      expires: "2023-06-30",
    },
    {
      id: "8",
      code: "VWX234",
      user: "Jessica",
      details: "Voucher for $20 off on spa services",
      created: "2023-06-17",
      expires: "2023-07-31",
    },
    {
      id: "9",
      code: "YZA567",
      user: "Christopher",
      details: "Voucher for a free appetizer",
      created: "2023-06-18",
      expires: "2023-06-30",
    },
    {
      id: "10",
      code: "BCD890",
      user: "Stephanie",
      details: "Voucher for 25% off on jewelry",
      created: "2023-06-19",
      expires: "2023-07-15",
    },
  ] as Vouchers[];

  return (
    <div>
      <main className="max-w-screen-xl mx-auto p-4 mt-8">
        <div>
          <h1 className="text-2xl font-bold mt-8">Requests</h1>
          <DataTable columns={approvedColumns} data={data} />
        </div>
      </main>
    </div>
  );
}
