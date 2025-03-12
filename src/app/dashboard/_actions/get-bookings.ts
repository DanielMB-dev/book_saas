'use server'
import { db } from "@/db"
import { bookings } from "@/db/schema"
import { BookingDataDB, GroupedBookings } from "@/types/booking"
import { auth } from "@clerk/nextjs/server"
import { eq, sql } from "drizzle-orm"
import { QueryResult } from "pg"



const parseBookingData = (groupedBookings: QueryResult<Record<string, unknown>>) => {
    const result: GroupedBookings = {
        bookings: groupedBookings.rows.map(row => ({
            reservation_date: String(row.reservation_date), // Convertir a string
            reservations: (row.reservations as any[]).map(res => ({
                id: String(res.id),
                guestName: String(res.guestName),
                guestEmail: String(res.guestEmail),
                notes: String(res.notes),
                startTime: new Date(res.startTime),
                endTime: new Date(res.endTime),
                createdAt: new Date(res.createdAt),
                userId: String(res.userId),
                eventGoogleId: String(res.eventGoogleId)
            }))
        }))
    };

    return result
}

export const getBookingsByDate = async () : Promise <GroupedBookings> => {
    const { sessionClaims } = await auth()
    const userId = sessionClaims?.sub
    if (!userId) {
        throw new Error("Not authenticated")
    }
    const bookingsDB = await db.execute(
        sql`
    SELECT 
      DATE(start_time) AS reservation_date, 
      json_agg(json_build_object(
        'id', id,
        'guestName', guest_name,
        'guestEmail', guest_email,
        'notes', notes,
        'startTime', start_time,
        'endTime', end_time,
        'createdAt', created_at,
        'userId', user_id,
        'eventGoogleId', event_google_id
      )) AS reservations
    FROM ${bookings}
    WHERE user_id = ${userId}
   AND start_time::timestamp >= (CURRENT_DATE + INTERVAL '8 hours')
    GROUP BY reservation_date
    ORDER BY reservation_date;
  `
    );

    return parseBookingData(bookingsDB)
}