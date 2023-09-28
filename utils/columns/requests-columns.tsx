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
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      return <span>{original.milestones.limit}</span>;
    },
  },
  {
    accessorKey: "details",
    header: "REQUEST DETAILS",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <span>Requested for {original.milestones.type.toUpperCase()}</span>
      );
    },
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
      const [loading, setLoading] = useState(false);
      const [couponCode, setCouponCode] = useState("");
      const [couponExpiry, setCouponExpiry] = useState(
        moment().add(1, "month").format("YYYY-MM-DD")
      );
      const router = useRouter();

      async function handleSubmit() {
        try {
          setLoading(true);
          await axios.post(`/api/vouchers`, {
            userId: row.original.user.id,
            requestId: row.original.id,
            code: couponCode,
            expiresAt: couponExpiry,
          });
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      }

      return (
        <div className="flex gap-2">
          <Button variant="destructive">Reject</Button>
          <Dialog>
            <DialogTrigger>
              <Button>Approve</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <form onSubmit={handleSubmit}>
                  <DialogTitle>Update Request Status</DialogTitle>
                  <DialogDescription>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="coupon-code" className="mt-4">
                        Coupon Code
                      </Label>
                      <Input
                        type="text"
                        required
                        id="coupon-code"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
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
                        required
                        id="coupon-expiry"
                        placeholder="dd/mm/yy"
                        value={couponExpiry}
                        onChange={(e) => setCouponExpiry(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </DialogDescription>
                  <Button
                    variant="default"
                    loading={loading}
                    type="submit"
                    className="mt-4"
                  >
                    Approve
                  </Button>
                </form>
              </DialogHeader>
              <DialogFooter>
                <div className="flex gap-4"></div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
