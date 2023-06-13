"use client";

import { Vouchers } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Vouchers>[] = [
  {
    accessorKey: "code",
    header: "Voucher Code",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "expires",
    header: "Expires",
  },
];
