import StatusBadge from "../organization/StatusBadge";

function BookingTable({ bookings = [] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Booking ID</th>
            <th className="px-6 py-4 text-left">Resource</th>
            <th className="px-6 py-4 text-left">Booked By</th>
            <th className="px-6 py-4 text-left">Booking Date</th>
            <th className="px-6 py-4 text-left">Time Slot</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const startDate = new Date(booking.startTime);
            const endDate = new Date(booking.endTime);
            const dateStr = startDate.toLocaleDateString();
            const timeStr = `${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

            return (
              <tr
                key={booking._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium font-mono text-xs text-slate-500">
                  {booking._id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4">{booking.resource?.name || "-"}</td>
                <td className="px-6 py-4">{booking.bookedBy?.name || "-"}</td>
                <td className="px-6 py-4">{dateStr}</td>
                <td className="px-6 py-4">{timeStr}</td>

                <td className="px-6 py-4 text-center">
                  <StatusBadge status={booking.status === 'Completed' ? 'Inactive' : 'Active'} />
                </td>

                <td className="px-6 py-4 text-center">
                  <button className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-600 hover:text-white transition">
                    View
                  </button>
                </td>
              </tr>
            );
          })}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;