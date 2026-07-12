import BookingStats from "../../components/booking/BookingStats";
import BookingFilters from "../../components/booking/BookingFilters";
import BookingTable from "../../components/booking/BookingTable";

function ResourceBooking() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Resource Booking
        </h1>

        <p className="mt-2 text-slate-500">
          Book and manage organizational resources.
        </p>
      </div>

      <BookingStats />

      <BookingFilters />

      <BookingTable />
    </div>
  );
}

export default ResourceBooking;