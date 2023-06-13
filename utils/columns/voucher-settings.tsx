"use client";

import { Button } from "@/components/ui/button";
import { VoucherTypes } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<VoucherTypes>[] = [
  {
    accessorKey: "limit",
    header: "USAGES LIMIT",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "company",
    header: "COMPANY",
  },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => <Button>View</Button>,
  },
];
