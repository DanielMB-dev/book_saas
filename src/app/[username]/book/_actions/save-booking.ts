'use server'

import { db } from "@/db";
import { availability, bookings } from "@/db/schema";
import { saveCalendarEvent } from "@/lib/google";
import { BookingDataDB } from "@/types/booking";
import { eq } from 'drizzle-orm';

export async function saveBookingDB(bookingValues: any) {
    try {
        await db.insert(bookings).values(bookingValues)

        const data: BookingDataDB = bookingValues;
        /*  const userId = await db
             .select({ userId: availability.userId })
             .from(availability)
             .where(eq(availability.userId, data.userId!)); 
             
             TODO aqui se debe cambiar el userId por orgID cuando implemente la organizacion en clerk*/

        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: false }
    }

}

export async function saveBookingGoogle(
    userId: string,
    calendarId: string,
    eventDetails: {
        summary: string;
        description?: string;
        start: Date;
        end: Date;
        location?: string;
        attendeesEmails?: string[];
        timeZone?: string;
    }) {

    try {
        const event = await saveCalendarEvent(userId, calendarId, eventDetails)

        return { success: true, eventGoogleId: event.id }
    } catch (error) {
        return { success: false, eventGoogleId: null }
    }

}
