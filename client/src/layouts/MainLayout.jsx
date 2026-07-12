import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;