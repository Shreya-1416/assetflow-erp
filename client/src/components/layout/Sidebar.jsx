import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiRepeat,
  FiCalendar,
  FiTool,
  FiClipboard,
  FiBarChart2,
  FiBell,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FiHome />,
  },
  {
    name: "Organization Setup",
    path: "/organization",
    icon: <FiUsers />,
  },
  {
    name: "Assets",
    path: "/assets",
    icon: <FiBox />,
  },
  {
    name: "Allocation & Transfer",
    path: "/allocation",
    icon: <FiRepeat />,
  },
  {
    name: "Resource Booking",
    path: "/booking",
    icon: <FiCalendar />,
  },
  {
    name: "Maintenance",
    path: "/maintenance",
    icon: <FiTool />,
  },
  {
    name: "Audit",
    path: "/audit",
    icon: <FiClipboard />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FiBarChart2 />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <FiBell />,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold tracking-wide">
          AssetFlow
        </h1>
        <p className="text-xs text-slate-400 mt-1">Enterprise ERP</p>
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;