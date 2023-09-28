"use client";

import { HistoryWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<HistoryWithUser>[] = [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "packageName",
    header: "Application",
  },
  {
    accessorKey: "createdAt",
    header: "Browsed At",
    cell: ({ row }) => {
      return moment(row.original.createdAt).format("DD/MM/YYYY hh:mm A");
    },
  },
];
