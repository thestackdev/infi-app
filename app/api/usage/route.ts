import db from "@/db";
import { dataUsage } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const [response] = await db.query.dataUsage.findMany({
    where: eq(dataUsage.userId, session.id),
  });

  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const json = await request.json();
  const data = json.data;

  if (!data) {
    return NextResponse.json({ error: "Data is required" }, { status: 400 });
  }

  await db.execute(sql`
        UPDATE data_usage 
            SET data = data + ${data}
        WHERE user_id = ${session.id};
  `);

  return NextResponse.json({
    success: true,
  });
}
