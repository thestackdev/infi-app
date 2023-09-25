import db from "@/db";
import { users } from "@/db/schema";
import { checkSignedIn } from "@/helpers/session";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await checkSignedIn();

  if (!session) {
    return new Response(
      JSON.stringify({ error: "You must be signed in to access this page" }),
      { status: 401 }
    );
  }

  const json = await request.json();
  const password = json.password;
  const newPassword = json.newPassword;

  if (!password || !newPassword) {
    return new Response(
      JSON.stringify({ error: "Password and new password are required" }),
      { status: 401 }
    );
  }

  const [response] = await db
    .select()
    .from(users)
    .where(
      sql`email = ${session.email} AND password = crypt(${password}, password)`
    );

  if (!response) {
    return NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
  }
  await db
    .update(users)
    .set({ password: sql`crypt(${newPassword}, gen_salt('bf'))` })
    .where(sql`email = ${session.email}`);

  return NextResponse.json({
    success: true,
    message: "Password updated successfully",
  });
}
