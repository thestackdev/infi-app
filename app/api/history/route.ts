import db from "@/db";
import { checkSignedIn } from "@/helpers/session";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { history } from "@/db/schema";

export async function GET(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const searchParams = new URL(request.url).searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const response = await db.query.history.findMany({
    where: eq(history.userId, session.id),
    orderBy: desc(history.createdAt),
    offset: (page - 1) * limit,
    limit: limit,
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const json = await request.json();

  const [response] = await db
    .insert(history)
    .values({
      ...json,
      userId: session.id,
    })
    .returning();

  return NextResponse.json(response);
}

export async function DELETE(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const json = await request.json();

  const [response] = await db
    .delete(history)
    .where(eq(history.id, json.id))
    .returning();

  return NextResponse.json(response);
}
