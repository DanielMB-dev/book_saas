import { BookingList } from "@/components/ui/bookings/BookingList";
import { bookings } from '../../db/schema';
import { getBookingsByDate } from "./_actions/get-bookings";

const DashboardIndexPage = async () => {

  const bookings = await getBookingsByDate()
 console.log(bookings)

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Check your next appointments
          </p>
        </div>
        {bookings.bookings.length === 0 ?
          <h3 className="text-3xl h-[200px] flex items-center justify-center">There are no bookings for today</h3>
          :
          <BookingList bookings={bookings} />
        }
      </div>
    </div>
  );
};

export default DashboardIndexPage;
