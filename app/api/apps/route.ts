import db from "@/db";
import { apps } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      {
        error: "You must be signed in to view this page",
      },
      { status: 401 }
    );
  }

  const response = await db.query.apps.findFirst({
    where: eq(apps.userId, session.id),
  });

  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const session = await checkSignedIn();
  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to view this page" },
      { status: 401 }
    );
  }

  const { data } = await request.json();

  const response = await db
    .update(apps)
    .set({ data })
    .where(eq(apps.userId, session.id))
    .returning();

  return NextResponse.json(response);
}
