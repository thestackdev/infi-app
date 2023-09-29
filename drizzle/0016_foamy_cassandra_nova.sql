ALTER TABLE "users" ALTER COLUMN "firebase_uid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "wifi_id" text NOT NULL;