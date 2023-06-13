import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Customers, Requests } from "@/types";
import { columns as customerColumns } from "@/utils/columns/customers-columns";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { Check, HardDrive, MessageSquare, Users } from "lucide-react";

export default function Home() {
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
  ] as Requests[];

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
  ] as Customers[];

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-orange-500 rounded-full p-3">
                <Users size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Total Customers</CardTitle>
                <CardDescription>6389</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-green-500 rounded-full p-3">
                <HardDrive size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Data Usages</CardTitle>
                <CardDescription>46,760 GB</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-green-500 rounded-full p-3">
                <Check size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Approved Requests</CardTitle>
                <CardDescription>376</CardDescription>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4 items-center">
              <div className="bg-orange-500 rounded-full p-3">
                <MessageSquare size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <CardTitle>Pending Reuquest</CardTitle>
                <CardDescription>35</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-4">Recent Requests</h1>
        <DataTable columns={requestColumns} data={requests} />
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-4">Recent Customers</h1>
        <DataTable columns={customerColumns} data={customers} />
      </div>
    </main>
  );
}
