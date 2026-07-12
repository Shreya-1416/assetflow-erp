import { FiBox, FiCalendar, FiTool } from "react-icons/fi";

function QuickActions() {
  const actions = [
    {
      title: "Register Asset",
      icon: <FiBox />,
      color: "bg-blue-600",
    },
    {
      title: "Book Resource",
      icon: <FiCalendar />,
      color: "bg-green-600",
    },
    {
      title: "Raise Maintenance",
      icon: <FiTool />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className={`${action.color} text-white rounded-xl py-8 px-5`}
          >
            <div className="text-3xl">{action.icon}</div>

            <span className="font-medium">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;