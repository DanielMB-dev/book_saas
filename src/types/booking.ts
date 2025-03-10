import { uuid } from 'drizzle-orm/pg-core';
export interface BookingDataDB {
    id?: string
    guestName: string
    guestEmail: string
    notes?: string
    startTime: Date
    endTime: Date
    userId: string | null
    eventGoogleId?: string
    createdAt?: Date
}

export interface GroupedBookings {
    bookings: { reservation_date: string, reservations: BookingDataDB[] }[]
}