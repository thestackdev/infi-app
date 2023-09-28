import db from "@/db";
import { dataUsage, milestones, requests } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { desc, eq } from "drizzle-orm";
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

  const response = await db.query.requests.findMany({
    where: eq(requests.userId, session.id),
    orderBy: desc(requests.createdAt),
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
  const milestoneId = json.milestoneId;

  const dataUsageResponse = await db.query.dataUsage.findFirst({
    where: eq(dataUsage.userId, session.id),
  });

  if (!dataUsageResponse) {
    return NextResponse.json({ error: "User not found" });
  }

  const milestone = await db.query.milestones.findFirst({
    where: eq(milestones.id, milestoneId),
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" });
  }

  if (dataUsageResponse.data < milestone.limit) {
    return NextResponse.json({ error: "You don't have enough data Usage" });
  }

  await db
    .update(dataUsage)
    .set({ data: dataUsageResponse.data - milestone.limit })
    .where(eq(dataUsage.userId, session.id))
    .returning();

  const response = await db
    .insert(requests)
    .values({ milestoneId: milestoneId, userId: session.id })
    .returning();

  return NextResponse.json(response);
}
