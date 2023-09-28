"use client";

import { VoucherWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<VoucherWithUser>[] = [
  {
    accessorKey: "code",
    header: "Voucher Code",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return `${row.original.user.name}`;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Approved At",
    cell: ({ row }) => {
      return moment(row.original.createdAt).format("DD/MM/YYYY hh:mm A");
    },
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      return moment(row.original.expiresAt).format("DD/MM/YYYY hh:mm A");
    },
  },
];
