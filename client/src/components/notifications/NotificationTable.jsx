import StatusBadge from "../organization/StatusBadge";

function NotificationTable() {

  const notifications = [
    {
      id: 1,
      message: "Laptop assigned to Rahul Sharma",
      module: "Allocation",
      date: "12 Jul 2026",
      priority: "High",
      status: "Active",
    },
    {
      id: 2,
      message: "Projector booking approved",
      module: "Booking",
      date: "12 Jul 2026",
      priority: "Medium",
      status: "Active",
    },
    {
      id: 3,
      message: "Printer maintenance completed",
      module: "Maintenance",
      date: "11 Jul 2026",
      priority: "Low",
      status: "Inactive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">

      <table className="w-full">

        <thead className="bg-slate-900 text-white">

          <tr>

            <th className="px-6 py-4 text-left">Notification</th>

            <th className="px-6 py-4 text-left">Module</th>

            <th className="px-6 py-4 text-left">Date</th>

            <th className="px-6 py-4 text-left">Priority</th>

            <th className="px-6 py-4 text-center">Status</th>

          </tr>

        </thead>

        <tbody>

          {notifications.map((notification) => (

            <tr
              key={notification.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {notification.message}
              </td>

              <td className="px-6 py-4">
                {notification.module}
              </td>

              <td className="px-6 py-4">
                {notification.date}
              </td>

              <td className="px-6 py-4">
                {notification.priority}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={notification.status} />
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default NotificationTable;