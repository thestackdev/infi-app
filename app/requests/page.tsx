import { columns as requestColumns } from "@/app/requests-columns";
import { DataTable } from "@/components/ui/data-table";
import { Requests } from "@/types";

export default function Page() {
  const requests = [
    {
      id: "1",
      name: "Shanmukeshwar",
      usage: "2,040 GB",
      details: "Shanmukeshwar requested for airtel mobile recharge voucher",
      status: "approved",
      date: "6/10/2020",
    },
    {
      id: "2",
      name: "Rajat",
      usage: "1,332 GB",
      details: "Rajat requested for airtel mobile recharge voucher",
      status: "rejected",
      date: "6/10/2020",
    },
    {
      id: "2",
      name: "Rajat",
      usage: "1,332 GB",
      details: "Rajat requested for Airtel mobile recharge voucher",
      status: "rejected",
      date: "2020-06-10",
    },
    {
      id: "7",
      name: "Emma",
      usage: "567 GB",
      details: "Emma requested for Vodafone mobile recharge voucher",
      status: "approved",
      date: "2023-01-15",
    },
    {
      id: "11",
      name: "Sandeep",
      usage: "998 GB",
      details: "Sandeep requested for Jio mobile recharge voucher",
      status: "pending",
      date: "2023-05-03",
    },
    {
      id: "14",
      name: "Priya",
      usage: "789 GB",
      details: "Priya requested for BSNL mobile recharge voucher",
      status: "approved",
      date: "2023-06-01",
    },
    {
      id: "22",
      name: "Ankit",
      usage: "456 GB",
      details: "Ankit requested for Idea mobile recharge voucher",
      status: "rejected",
      date: "2023-02-19",
    },
    {
      id: "28",
      name: "Neha",
      usage: "1,234 GB",
      details: "Neha requested for Airtel mobile recharge voucher",
      status: "approved",
      date: "2023-05-20",
    },
    {
      id: "33",
      name: "Amit",
      usage: "876 GB",
      details: "Amit requested for Jio mobile recharge voucher",
      status: "pending",
      date: "2023-06-05",
    },
    {
      id: "41",
      name: "Soniya",
      usage: "345 GB",
      details: "Soniya requested for Vodafone mobile recharge voucher",
      status: "rejected",
      date: "2023-03-12",
    },
    {
      id: "46",
      name: "Rahul",
      usage: "1,567 GB",
      details: "Rahul requested for BSNL mobile recharge voucher",
      status: "approved",
      date: "2023-05-29",
    },

    {
      id: "53",
      name: "Kavita",
      usage: "678 GB",
      details: "Kavita requested for Idea mobile recharge voucher",
      status: "pending",
      date: "2023-06-08",
    },
  ] as Requests[];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>
      <DataTable columns={requestColumns} data={requests} />
    </main>
  );
}
