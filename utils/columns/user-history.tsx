"use client";

import { HistoryWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<HistoryWithUser>[] = [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "package_name",
    header: "Application",
  },
  {
    accessorKey: "createdAt",
    header: "Browsed At",
  },
];
