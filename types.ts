import { JWTPayload } from "jose";
import * as z from "zod";
import { createSelectSchema } from "drizzle-zod";
import { dataUsage, milestones, requests, users } from "./db/schema";

export type Customers = {
  id: string;
  name: string;
  email: string;
  mobile: number;
  created: string;
};

export type Vouchers = {
  id: string;
  code: string;
  user: string;
  details: string;
  created: string;
  expires: string;
};

export type History = {
  id?: string;
  url: string;
  package_name: string;
  created: string;
};

const selectUserSchema = createSelectSchema(users);
const selectRequestsSchema = createSelectSchema(requests);
const selectDataUsageSchema = createSelectSchema(dataUsage);
const selectMilestoneSchema = createSelectSchema(milestones);

export type User = z.infer<typeof selectUserSchema>;
export type Request = z.infer<typeof selectRequestsSchema>;
export type DataUsage = z.infer<typeof selectDataUsageSchema>;
export type Milestone = z.infer<typeof selectMilestoneSchema>;

export type Session = JWTPayload & {
  id: string;
  username: string;
  mobile: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RequestsWithUserWithUsage = Request & {
  user: User & {
    usage: DataUsage;
  };
};

export type HistoryWithUser = History & {
  user: User;
};
