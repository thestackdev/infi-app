import db from "@/db";
import { dataUsage, milestones, users } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq, gt, lte } from "drizzle-orm";
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

  const dataUser = await db.query.dataUsage.findFirst({
    where: eq(dataUsage.userId, session.id),
  });

  if (!dataUser) return NextResponse.json({ error: "User not found" });

  const milestonesResponse = await db.query.milestones.findMany({
    where: lte(milestones.limit, dataUser.data),
  });

  if (!response) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: response,
    milestones: milestonesResponse,
  });
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
