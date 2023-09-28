import db from "@/db";
import { requests, vouchers } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const json = await request.json();
  const userId = json.userId;
  const requestId = json.requestId;
  const code = json.code;
  const expiresAt = json.expiresAt;

  await db
    .insert(vouchers)
    .values({
      userId: userId,
      request: requestId,
      code: code,
      expiresAt: new Date(expiresAt),
    })
    .returning();

  await db
    .update(requests)
    .set({ status: "approved" })
    .where(eq(requests.id, requestId))
    .returning();

  return NextResponse.json({ success: "true" });
}
