import db from "@/db";
import { checkSignedIn } from "@/helpers/session";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this page" },
      { status: 401 }
    );
  }

  const response = await db.query.userSettings.findMany();

  return NextResponse.json(response);
}
