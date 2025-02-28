export interface BookingDataDB {
    guestName: string
    guestEmail: string
    notes?: string
    startTime: Date
    endTime: Date
    userId: string | null
}