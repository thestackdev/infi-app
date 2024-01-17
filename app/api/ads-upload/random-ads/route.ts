import db from "@/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await db.execute(sql`
    SELECT * FROM ads ORDER BY RANDOM() LIMIT 1;
`);

  if (!response.rows.length) {
    return NextResponse.json({ src: "" });
  }

  return NextResponse.json({
    src: `https://infiapp-ads.s3.amazonaws.com/${response.rows[0].src}`,
  });
}
