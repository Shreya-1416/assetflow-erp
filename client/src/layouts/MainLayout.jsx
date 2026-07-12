import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <Outlet />

        </main>

        <footer className="border-t py-5 text-center text-sm text-slate-500">
          © 2026 AssetFlow ERP | Built for Hackathon
        </footer>

      </div>

    </div>
  );
}

export default MainLayout;