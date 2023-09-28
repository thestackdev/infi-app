"use client";

import { AppData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AppData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bundleId",
    header: "Package Name",
  },
];
