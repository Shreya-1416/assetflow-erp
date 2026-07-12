import { FiBell, FiSearch, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Enterprise Asset Management
        </h2>

        <p className="text-sm text-slate-500">
          Manage organizational assets efficiently
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-full bg-slate-100 p-3 hover:bg-slate-200">
          <FiBell className="text-xl text-slate-700" />

          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <FiUser />
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Asset Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;