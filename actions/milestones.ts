"use server";

import db from "@/db";
import { milestones } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createMilestone(formData: FormData) {
  const limit = formData.get("limit") as string;
  const type = formData.get("type") as string;

  if (!limit || !type) return;

  const [response] = await db
    .insert(milestones)
    .values({ limit: parseFloat(limit), type })
    .returning();

  if (!response) {
    throw new Error("Failed to create milestone");
  }

  revalidatePath("dashboard/gift-settings");
}
