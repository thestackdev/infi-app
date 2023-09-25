import db from "@/db";
import { users } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const response = await db.query.users.findFirst({
    where: eq(users.id, session.id),
  });

  if (!response) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const session = await checkSignedIn();

  const json = await request.json();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  delete json.id;
  delete json.createdAt;
  delete json.updatedAt;
  delete json.password;
  delete json.email;
  delete json.admin;

  const [response] = await db
    .update(users)
    .set(json)
    .where(eq(users.id, session.id))
    .returning();

  return NextResponse.json(response);
}
