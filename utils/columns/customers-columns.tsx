"use client";

import { Customers } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, Trash2 } from "lucide-react";

export const columns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "CUSTOMER NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "mobile",
    header: "MOBILE",
  },
  {
    accessorKey: "registeredDate",
    header: "REGISTERED DATE",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex flex-row gap-2">
          <Trash2 className="cursor-pointer" />
          <EyeIcon className="cursor-pointer" />
        </div>
      );
    },
  },
];
