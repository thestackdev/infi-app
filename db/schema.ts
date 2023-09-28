import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  username: varchar("username").unique().notNull(),
  name: text("full_name"),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  avatarUrl: text("avatar_url"),
  mobile: text("mobile"),
  isActive: boolean("is_active").notNull().default(true),
  admin: boolean("admin").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const dataUsage = pgTable("data_usage", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  data: bigint("data", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const history = pgTable("history", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  packageName: text("package_name").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const apps = pgTable("apps", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  data: jsonb("data").default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  milestoneId: uuid("milestone_id")
    .notNull()
    .references(() => milestones.id, {
      onDelete: "cascade",
    }),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const vouchers = pgTable("vouchers", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  request: uuid("request_id")
    .notNull()
    .references(() => requests.id, {
      onDelete: "cascade",
    }),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  displayName: text("display_name").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull(),
});

export const milestones = pgTable("milestones", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  type: text("type").notNull(),
  limit: bigint("limit", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const requestsUsersRelations = relations(requests, ({ one }) => ({
  user: one(users, {
    fields: [requests.userId],
    references: [users.id],
  }),
}));

export const usersUsageRelations = relations(users, ({ one }) => ({
  usage: one(dataUsage, {
    fields: [users.id],
    references: [dataUsage.userId],
  }),
}));

export const historyUsersRelations = relations(history, ({ one }) => ({
  user: one(users, {
    fields: [history.userId],
    references: [users.id],
  }),
}));

export const requestsMilestonesRelations = relations(requests, ({ one }) => ({
  milestones: one(milestones, {
    fields: [requests.milestoneId],
    references: [milestones.id],
  }),
}));

export const vouchersUsersRelations = relations(vouchers, ({ one }) => ({
  user: one(users, {
    fields: [vouchers.userId],
    references: [users.id],
  }),
}));
