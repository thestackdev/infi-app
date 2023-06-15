"use client";

import { Customers } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, Trash2 } from "lucide-react";
import moment from "moment";

export const columns: ColumnDef<Customers>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => moment(row.original.created).format("DD/MM/YYYY"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-4">
          <Trash2 className="cursor-pointer" size={19} />
          <EyeIcon className="cursor-pointer" size={19} />
        </div>
      );
    },
  },
];
