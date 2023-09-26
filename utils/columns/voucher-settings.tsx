"use client";

import { Milestone } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<Milestone>[] = [
  {
    accessorKey: "limit",
    header: "USAGES LIMIT",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.limit} GB</span>;
    },
  },
  {
    accessorKey: "type",
    header: "TYPE",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.type.toUpperCase()}</span>;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center">
          <Trash2 className="cursor-pointer" size={19} />
        </div>
      );
    },
  },
];
