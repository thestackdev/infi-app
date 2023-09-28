"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => moment(row.original.createdAt).format("DD/MM/YYYY"),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-4">
          <Link href={`/dashboard/customers/${row.original.id}`}>
            <EyeIcon className="cursor-pointer" size={19} />
          </Link>
        </div>
      );
    },
  },
];
