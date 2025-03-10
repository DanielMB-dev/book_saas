'use client'
import { handleEdit } from '@/app/dashboard/_actions/get-events-google';
import { getCalendarEvents } from '@/lib/google';
import { BookingDataDB } from '@/types/booking'
import { MdOutlineCalendarMonth, MdEditCalendar, MdDeleteOutline } from "react-icons/md";

const formatTime = (dateString: Date) => {
    return new Date(dateString).toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};



interface BookingProps {
    reservations: BookingDataDB[]

}
export const Booking = ({ reservations }: BookingProps) => {

    return (
        <ol className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
            {reservations.map(res => (
                <li key={res.createdAt!.toString()} className='flex justify-between items-center'>
                    <div className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700 gap-3">
                        <MdOutlineCalendarMonth size={40} />
                        <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal"><span className="font-medium text-gray-900 dark:text-white">{formatTime(res.startTime)} a {formatTime(res.endTime)}</span></div>
                            <div className="text-base font-normal"><span className="font-medium text-gray-900 dark:text-white">{res.guestName}</span></div>
                            <div className="text-sm font-normal">{res.notes}</div>

                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <MdDeleteOutline size={40} className='hover:cursor-pointer' />
                        <MdEditCalendar onClick={() => handleEdit(res.eventGoogleId!)} size={40} className='hover:cursor-pointer' />

                    </div>
                </li>
            ))}
        </ol>
    )
}
