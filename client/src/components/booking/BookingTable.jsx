import StatusBadge from "../organization/StatusBadge";

function BookingTable() {

  const bookings = [
    {
      id: "BK001",
      resource: "Conference Room A",
      bookedBy: "Rahul Sharma",
      date: "12 Jul 2026",
      time: "10:00 AM - 11:00 AM",
      status: "Active",
    },
    {
      id: "BK002",
      resource: "Projector",
      bookedBy: "Priya Singh",
      date: "12 Jul 2026",
      time: "02:00 PM - 03:00 PM",
      status: "Inactive",
    },
    {
      id: "BK003",
      resource: "Company Car",
      bookedBy: "Amit Verma",
      date: "13 Jul 2026",
      time: "09:00 AM - 01:00 PM",
      status: "Active",
    },
  ];

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

          {bookings.map((booking) => (

            <tr
              key={booking.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {booking.id}
              </td>

              <td className="px-6 py-4">
                {booking.resource}
              </td>

              <td className="px-6 py-4">
                {booking.bookedBy}
              </td>

              <td className="px-6 py-4">
                {booking.date}
              </td>

              <td className="px-6 py-4">
                {booking.time}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={booking.status} />
              </td>

              <td className="px-6 py-4 text-center">

                <button className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-600 hover:text-white">
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default BookingTable;