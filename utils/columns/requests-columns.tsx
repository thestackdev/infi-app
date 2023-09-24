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
import { RequestsWithUserWithUsage } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<RequestsWithUserWithUsage>[] = [
  {
    accessorKey: "name",
    header: "CUSTOMER NAME",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.user.name}</span>;
    },
  },
  {
    accessorKey: "usage",
    header: "DATA USAGE",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.user.usage.data}</span>;
    },
  },
  {
    accessorKey: "details",
    header: "REQUEST DETAILS",
  },
  {
    accessorKey: "status",
    header: "REQUEST STATUS",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <Badge
          variant={original.status === "approved" ? "default" : "destructive"}
        >
          {original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "REQUEST DATE",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{moment(original.createdAt).format("DD/MM/YYYY")}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>
            <Button>View</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Request Status</DialogTitle>
              <DialogDescription>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="coupon-code" className="mt-4">
                    Coupon Code
                  </Label>
                  <Input
                    type="text"
                    id="coupon-code"
                    placeholder="Enter Coupon Code"
                    className="mt-1"
                  />
                </div>
              </DialogDescription>
              <DialogDescription>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="coupon-expiry" className="mt-4">
                    Coupon Expiry
                  </Label>
                  <Input
                    type="date"
                    id="coupon-expiry"
                    placeholder="dd/mm/yy"
                    className="mt-1"
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
