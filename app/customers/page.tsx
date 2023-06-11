import { columns as customerColumns } from "@/app/customers-columns";
import { DataTable } from "@/components/ui/data-table";
import { Customers } from "@/types";

export default function Page() {
  const customers = [
    {
      id: "1",
      name: "Shanmukeshwar",
      email: "shanmukeshwar03@gmail.com",
      mobile: 1234567890,
      registeredDate: "6/10/2020",
    },
    {
      id: "2",
      name: "Rajat",
      email: "rajat@example.com",
      mobile: 1234567890,
      registeredDate: "6/10/2020",
    },
    {
      id: "1",
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "555-123-4567",
      registeredDate: "2023-06-10",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      mobile: "555-987-6543",
      registeredDate: "2023-06-10",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alexjohnson@example.com",
      mobile: "555-456-7890",
      registeredDate: "2023-06-11",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emilydavis@example.com",
      mobile: "555-321-6549",
      registeredDate: "2023-06-11",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      mobile: "555-789-1234",
      registeredDate: "2023-06-12",
    },
    {
      id: "6",
      name: "Sarah Wilson",
      email: "sarahwilson@example.com",
      mobile: "555-234-5678",
      registeredDate: "2023-06-12",
    },
    {
      id: "7",
      name: "David Thompson",
      email: "davidthompson@example.com",
      mobile: "555-876-5432",
      registeredDate: "2023-06-13",
    },
    {
      id: "8",
      name: "Jessica Anderson",
      email: "jessicaanderson@example.com",
      mobile: "555-432-1098",
      registeredDate: "2023-06-13",
    },
    {
      id: "9",
      name: "Christopher Wilson",
      email: "christopherwilson@example.com",
      mobile: "555-654-3210",
      registeredDate: "2023-06-14",
    },
    {
      id: "10",
      name: "Stephanie Martinez",
      email: "stephaniemartinez@example.com",
      mobile: "555-210-9876",
      registeredDate: "2023-06-14",
    },
  ] as Customers[];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <DataTable columns={customerColumns} data={customers} />
    </main>
  );
}
