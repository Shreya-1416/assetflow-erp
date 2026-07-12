import { useState, useEffect } from "react";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import apiClient from "../../api/apiClient";

function Navbar() {
  const [profile, setProfile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const [profileRes, notifRes] = await Promise.all([
          apiClient.get("/auth/me"),
          apiClient.get("/system/notifications")
        ]);
        
        if (profileRes.success) {
          setProfile(profileRes.data);
        }
        
        if (notifRes.success) {
          // Count unread notifications
          const unread = notifRes.data.filter(n => !n.readAt).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };
    
    // Only fetch if we have a token
    if (localStorage.getItem("token")) {
      fetchNavbarData();
    }
  }, []);

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

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center uppercase">
            {profile ? profile.name.charAt(0) : <FiUser />}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {profile ? profile.name : "Loading..."}
            </p>

            <p className="text-xs text-slate-500">
              {profile ? profile.role : "..."}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;