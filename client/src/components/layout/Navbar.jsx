import {
  FiBell,
  FiCalendar,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Enterprise Asset Management System
        </h2>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <FiCalendar />
          <span>12 July 2026</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden lg:block">

          <FiSearch className="absolute left-4 top-3.5 text-slate-400" />

          <input
            type="text"
            placeholder="Search assets, employees..."
            className="w-80 rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:bg-white"
          />

        </div>

        {/* Notification */}
        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

          <FiBell className="text-xl text-slate-700" />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            3
          </span>

        </button>

        {/* Settings */}
        <button className="rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">

          <FiSettings className="text-xl text-slate-700" />

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">

            <FiUser />

          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              Admin
            </h3>

            <p className="text-xs text-slate-500">
              System Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;