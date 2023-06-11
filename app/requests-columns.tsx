"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Requests } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Requests>[] = [
  {
    accessorKey: "name",
    header: "CUSTOMER NAME",
  },
  {
    accessorKey: "usage",
    header: "DATA TOTAL USAGES",
  },
  {
    accessorKey: "details",
    header: "REQUEST DETAILS",
  },
  {
    accessorKey: "status",
    header: "REQUEST STATUS",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Badge
          variant={payment.status === "approved" ? "default" : "destructive"}
        >
          {payment.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "REQUEST DATE",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Dialog>
          <DialogTrigger>
            <Button>View</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Update Request Status for {row.original.name}
              </DialogTitle>
              <DialogDescription className="pt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <Input
                    type="text"
                    id="coupon-code"
                    placeholder="Enter Coupon Code"
                  />
                </div>
              </DialogDescription>
              <DialogDescription className="pt-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="coupon-expiry">Coupon Expiry</Label>
                  <Input
                    type="date"
                    id="coupon-expiry"
                    placeholder="dd/mm/yy"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex gap-4">
                <Button variant="destructive">Reject</Button>
                <Button variant="default">Approve</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
