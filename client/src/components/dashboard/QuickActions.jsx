import { FiBox, FiCalendar, FiTool, FiArrowRight } from "react-icons/fi";

function QuickActions() {
  const actions = [
    {
      title: "Register Asset",
      description: "Add a new asset into inventory",
      icon: <FiBox />,
      color: "bg-blue-600",
    },
    {
      title: "Book Resource",
      description: "Reserve rooms and equipment",
      icon: <FiCalendar />,
      color: "bg-green-600",
    },
    {
      title: "Raise Maintenance",
      description: "Create a maintenance request",
      icon: <FiTool />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used operations
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
          >
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white ${action.color}`}
            >
              {action.icon}
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {action.description}
            </p>

            <div className="mt-5 flex items-center gap-2 font-medium text-blue-600">
              Open
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;