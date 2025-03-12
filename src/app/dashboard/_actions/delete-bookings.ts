'use server'
import { db } from "@/db"
import { bookings } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export const deleteBookingsDB = async (googleEventId: string) => {
    try {
        const { sessionClaims } = await auth()
        const userId = sessionClaims?.sub
        if (!userId) {
            throw new Error("Not authenticated")
        }

        const resDB = await db.delete(bookings).where(eq(bookings.eventGoogleId, googleEventId))
        return {
            data: resDB.rowCount,
            success: true
        }
    } catch (error) {
        return {
            data: error,
            success: false
        }
    }

}