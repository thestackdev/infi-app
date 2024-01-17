"use client";

import { Badge } from "@/components/ui/badge";
import { RequestsWithUserWithUsage } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const columns: ColumnDef<RequestsWithUserWithUsage>[] = [
  {
    accessorKey: "name",
    header: "CUSTOMER NAME",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.user.name}</span>;
    },
  },
  {
    accessorKey: "usage",
    header: "DATA USAGE",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{original.milestones.limit}</span>;
    },
  },
  {
    accessorKey: "details",
    header: "REQUEST DETAILS",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <span>Requested for {original.milestones.type.toUpperCase()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "REQUEST STATUS",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <Badge
          variant={original.status === "approved" ? "default" : "destructive"}
        >
          {original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "REQUEST DATE",
    cell: ({ row }) => {
      const original = row.original;
      return <span>{moment(original.createdAt).format("DD/MM/YYYY")}</span>;
    },
  },
];
