import { BookingList } from "@/components/ui/bookings/BookingList";
import { bookings } from '../../db/schema';
import { getBookingsByDate } from "./_actions/get-bookings";

const DashboardIndexPage = async () => {

  const bookings = await getBookingsByDate()
  console.log(bookings.bookings[0].reservations)

  return (
    <div className="container mx-auto py-10">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Check your next appointments
              </p>
            </div>
            <BookingList bookings={bookings} />
          </div>
        </div>
  );
};

export default DashboardIndexPage;
