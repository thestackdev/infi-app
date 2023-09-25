import db from "@/db";
import { bookmarks } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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
  const response = await db.query.bookmarks.findMany({
    where: eq(bookmarks.userId, session.id),
    orderBy: desc(bookmarks.createdAt),
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
    .insert(bookmarks)
    .values({ ...json, userId: session.id })
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

  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Bookmark Id is required" },
      { status: 400 }
    );
  }

  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, session.id), eq(bookmarks.id, id)));

  return NextResponse.json({ success: true });
}
