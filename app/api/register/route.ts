import db from "@/db/index";
import { apps, dataUsage, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return new NextResponse(
        JSON.stringify({ error: "FirebaseUid is missing" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const [response] = await db
      .select()
      .from(users)
      .where(eq(users.firebaseUid, firebaseUid));

    if (!response) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT(response)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setSubject(response.id)
      .setExpirationTime("365d")
      .sign(secret);

    return new Response(JSON.stringify({ success: true, token: token }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Set-Cookie": `token=${token};Path=/`,
      },
    });
  } catch (error) {
    const e = error as Error;
    return new Response(e.message, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const [response] = await db.insert(users).values(json).returning();

    if (!response) {
      return new Response(
        JSON.stringify({ error: "Unable to register at the moment" }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }

    await db.insert(dataUsage).values({
      userId: response.id,
      data: 0,
    });

    await db.insert(apps).values({
      userId: response.id,
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT(response)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setSubject(response.id)
      .setExpirationTime("365d")
      .sign(secret);

    return new Response(JSON.stringify({ success: true, token: token }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "Set-Cookie": `token=${token};Path=/`,
      },
    });
  } catch (e) {
    console.log(e);
    const error = e as Error;
    return new Response(error.message, {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
