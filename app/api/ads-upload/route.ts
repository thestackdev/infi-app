import { NextRequest, NextResponse } from "next/server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import db from "@/db";
import { ads } from "@/db/schema";
import { eq } from "drizzle-orm";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET() {
  try {
    const response = await db.select().from(ads);

    return NextResponse.json(
      response.map((ad) => ({
        ...ad,
        src: `https://${Bucket}.s3.amazonaws.com/${ad.src}`,
      }))
    );
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  function changeFilesToRandomNames(file: File) {
    const randomName = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    const newName = `${randomName}.${extension}`;

    return newName;
  }

  await Promise.all(
    files.map(async (file) => {
      const Body = (await file.arrayBuffer()) as Buffer;
      const newName = changeFilesToRandomNames(file);

      await s3.send(
        new PutObjectCommand({
          Bucket,
          Key: newName,
          Body,
          ContentType: file.type,
        })
      );
      await db.insert(ads).values({ src: newName });
    })
  );

  return NextResponse.json({
    message: "Uploaded successfully",
  });
}

export async function DELETE(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const id = searchParams.get("id") as string;

  await db.delete(ads).where(eq(ads.id, id));

  return NextResponse.json({
    message: "Deleted successfully",
  });
}
