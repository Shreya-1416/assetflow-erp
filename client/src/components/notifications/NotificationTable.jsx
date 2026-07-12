import StatusBadge from "../organization/StatusBadge";

function NotificationTable({ notifications = [] }) {
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
              key={notification._id}
              className={`border-t hover:bg-slate-50 ${notification.isRead ? 'opacity-70' : 'font-semibold'}`}
            >
              <td className="px-6 py-4">
                {notification.payload?.message || notification.payload?.title || "Notification"}
              </td>

              <td className="px-6 py-4">
                {notification.payload?.type || "System"}
              </td>

              <td className="px-6 py-4">
                {new Date(notification.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                Normal
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={notification.isRead ? 'Inactive' : 'Active'} />
              </td>
            </tr>
          ))}
          {notifications.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NotificationTable;