CREATE TABLE IF NOT EXISTS "ads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"src" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
