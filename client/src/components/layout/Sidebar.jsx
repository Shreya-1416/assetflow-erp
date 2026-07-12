import {
  FiGrid,
  FiUsers,
  FiBox,
  FiRepeat,
  FiCalendar,
  FiTool,
  FiClipboard,
  FiBarChart2,
  FiBell,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: FiGrid },
  { name: "Organization", path: "/organization", icon: FiUsers },
  { name: "Assets", path: "/assets", icon: FiBox },
  { name: "Allocation", path: "/allocation", icon: FiRepeat },
  { name: "Booking", path: "/booking", icon: FiCalendar },
  { name: "Maintenance", path: "/maintenance", icon: FiTool },
  { name: "Audit", path: "/audit", icon: FiClipboard },
  { name: "Reports", path: "/reports", icon: FiBarChart2 },
  { name: "Notifications", path: "/notifications", icon: FiBell },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          AssetFlow
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Enterprise ERP
        </p>

      </div>

      <nav className="p-4">

        {menus.map(({ name, path, icon: Icon }) => (

          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <Icon size={20} />

            {name}

          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;