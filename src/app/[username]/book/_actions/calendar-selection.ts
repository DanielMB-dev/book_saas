'use server'

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { calendarSelections } from '@/db/schema';

export async function getCalendarId(userId: string) {
  const calendarId = await db
    .select({ calendarId: calendarSelections.calendarId })
    .from(calendarSelections)
    .where(eq(calendarSelections.userId, userId));
  
  return calendarId

}