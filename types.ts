import { JWTPayload } from "jose";
import * as z from "zod";
import { createSelectSchema } from "drizzle-zod";
import {
  apps,
  dataUsage,
  history,
  milestones,
  requests,
  users,
  vouchers,
} from "./db/schema";

const selectUserSchema = createSelectSchema(users);
const selectRequestsSchema = createSelectSchema(requests);
const selectDataUsageSchema = createSelectSchema(dataUsage);
const selectMilestoneSchema = createSelectSchema(milestones);
const selectHistorySchema = createSelectSchema(history);
const selectVoucherSchema = createSelectSchema(vouchers);
const selectAppsSchema = createSelectSchema(apps);

export type User = z.infer<typeof selectUserSchema>;
export type Request = z.infer<typeof selectRequestsSchema>;
export type DataUsage = z.infer<typeof selectDataUsageSchema>;
export type Milestone = z.infer<typeof selectMilestoneSchema>;
export type History = z.infer<typeof selectHistorySchema>;
export type Voucher = z.infer<typeof selectVoucherSchema>;
export type App = z.infer<typeof selectAppsSchema>;
export type AppData = App["data"];

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
  milestones: Milestone;
};

export type HistoryWithUser = History & {
  user: User;
};

export type VoucherWithUser = Voucher & {
  user: User;
};
