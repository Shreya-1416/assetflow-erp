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

const menu = [
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
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="text-3xl font-bold p-6 border-b border-slate-700">
        AssetFlow
      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;