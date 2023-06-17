"use client";

import { History } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "package_name",
    header: "Application",
  },
  {
    accessorKey: "created",
    header: "Browsed At",
  },
];
