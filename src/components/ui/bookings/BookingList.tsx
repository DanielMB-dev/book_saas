
import React from 'react'

import {  GroupedBookings } from '@/types/booking';
import { Booking } from './Booking';
import { getCalendarEvents } from '@/lib/google';



interface BookingListProps {
    bookings: GroupedBookings
}

export const BookingList = ({ bookings }: BookingListProps) => {


    return (
        <section>
            {bookings.bookings.map(date => (
                <div key={date.reservation_date} className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <time className="text-lg font-semibold text-gray-900 dark:text-white">{date.reservation_date}</time>
                    <Booking reservations={date.reservations} />
                </div>
            ))}

        </section>




    )
}
