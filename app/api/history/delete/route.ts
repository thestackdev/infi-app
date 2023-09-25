import db from "@/db";
import { history } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const session = await checkSignedIn();
  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  await db.delete(history).where(eq(history.userId, session.id));

  return NextResponse.json({ success: true });
}
