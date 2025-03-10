'use server'

import { generateICS } from "@/lib/ics"
import { BookingDataDB } from "@/types/booking"
import { getUser } from "./user";
import { saveBookingDB, saveBookingGoogle } from "./save-booking";
import { getCalendarId } from "./calendar-selection";
import { sendEmailMessage } from "@/lib/email";



interface BookingData {
  name: string
  email: string
  notes?: string
  date: Date
  time: Date
  username: string
}

export async function createBooking({
  name,
  email,
  notes,
  date,
  time,
  username
}: BookingData) {
  try {
    // Generate calendar event content
    const eventContent = generateICS({
      startTime: time,
      endTime: new Date(time.getTime() + 30 * 60 * 1000), // 30 minutes duration
      summary: `Meeting with ${username}`,
      description: notes || 'No additional notes provided.',
      organizer: {
        name: username,
        email: process.env.NOTIFICATION_EMAIL || 'contacto@devsintown.com'
      }
    })

    const res = await getUser(username)

    const booking: BookingDataDB = {
      userId: res!.id,
      guestName: name,
      guestEmail: email,
      notes,
      startTime: time,
      endTime: new Date(time.getTime() + 30 * 60 * 1000),
    }

    // const bookingSaved = await saveBookingDB(booking)
    const calendarId = await getCalendarId(booking.userId!)

    const googleSaved = await saveBookingGoogle(booking.userId!, calendarId[0].calendarId, {
      summary: booking.notes!,
      description: booking.guestName,
      start: booking.startTime,
      end: booking.endTime,
      attendeesEmails: [booking.guestEmail]
    })

    if (googleSaved.success) {
      booking.eventGoogleId = googleSaved.eventGoogleId
      const bookingSaved = await saveBookingDB(booking)
      if (bookingSaved.success) {
        sendEmailMessage(booking, eventContent)
        return {
          success: true
        }
      }
      return {
        success: false
      }

    }
    return {
      success: false
    }
  } catch (error) {
    console.error('Failed to create booking:', error)
    return { success: false, error: 'Failed to create booking' }
  }
}
