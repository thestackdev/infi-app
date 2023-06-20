"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePocketbase } from "@/providers/pocketbase-provider";
import { History } from "@/types";
import { columns as approvedColumns } from "@/utils/columns/approved-vouchers";
import { columns as requestColumns } from "@/utils/columns/requests-columns";
import { columns as userHistosy } from "@/utils/columns/user-history";
import { Label } from "@radix-ui/react-label";
import moment from "moment";
import { Admin, Record } from "pocketbase";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const { pocketbase } = usePocketbase();

  const [history, setHistory] = useState<History[]>([]);
  const [user, setUser] = useState<Record | Admin | null>(null);

  async function getHistory() {
    const resultList = (await pocketbase
      ?.collection("history")
      .getList(1, 10000, {
        filter: `user="${params.id}"`,
      })) as any;

    setHistory(resultList?.items as History[]);
  }

  async function getUser() {
    try {
      const user = await pocketbase?.collection("users").getOne(params.id);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHistory();
    getUser();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-1 gap-4">
        <Card className="h-fit w-fit">
          <CardHeader>
            <CardTitle>{user?.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={user?.email}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Phone</Label>
              <Input
                type="number"
                id="phone"
                placeholder="Phone"
                value={user?.mobile}
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Register At</Label>
              <Input
                type="text"
                id="created"
                placeholder="Register At"
                value={moment(user?.created).format("DD/MM/YYYY")}
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="history" className="mt-8">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <DataTable columns={userHistosy} data={history} />
        </TabsContent>
        <TabsContent value="rewards">
          <DataTable columns={approvedColumns} data={[]} />
        </TabsContent>
        <TabsContent value="requests">
          <DataTable columns={requestColumns} data={[]} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
