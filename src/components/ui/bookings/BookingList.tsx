
import React from 'react'

import {  GroupedBookings } from '@/types/booking';


const formatTime = (dateString: Date) => {
    return new Date(dateString).toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, 
    });
};

interface BookingListProps {
    bookings: GroupedBookings
}

export const BookingList = ({ bookings }: BookingListProps) => {

    return (
        <section>
            {bookings.bookings.map(date => (
                <div key={date.reservation_date} className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <time className="text-lg font-semibold text-gray-900 dark:text-white">{date.reservation_date}</time>
                    <ol className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
                        {date.reservations.map(res => (
                            <li key={res.createdAt.toString()}>
                                <a href="#" className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <img className="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos image" />
                                    <div className="text-gray-600 dark:text-gray-400">
                                        <div className="text-base font-normal"><span className="font-medium text-gray-900 dark:text-white">{formatTime(res.startTime)} a {formatTime(res.endTime)}</span></div>
                                        <div className="text-base font-normal"><span className="font-medium text-gray-900 dark:text-white">{res.guestName}</span></div>

                                        <div className="text-sm font-normal">{res.notes}</div>

                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}

        </section>




    )
}
