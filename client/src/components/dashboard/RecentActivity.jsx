import {
  FiBox,
  FiRepeat,
  FiTool,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

function RecentActivity() {
  const activities = [
    {
      icon: <FiBox />,
      title: "Dell Latitude 7420 registered",
      time: "10 min ago",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FiRepeat />,
      title: "Laptop transferred to Engineering",
      time: "35 min ago",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FiCalendar />,
      title: "Conference Room A booked",
      time: "1 hour ago",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FiTool />,
      title: "Printer maintenance request created",
      time: "3 hours ago",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FiCheckCircle />,
      title: "Audit completed successfully",
      time: "Yesterday",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest activities across the system
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${activity.color}`}
              >
                {activity.icon}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>

            <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-600 hover:text-white">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;