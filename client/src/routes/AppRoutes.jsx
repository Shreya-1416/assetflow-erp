import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import OrganizationSetup from "../pages/OrganizationSetup/OrganizationSetup";
import Assets from "../pages/Assets/Assets";
import AllocationTransfer from "../pages/AllocationTransfer/AllocationTransfer";
import ResourceBooking from "../pages/ResourceBooking/ResourceBooking";
import Maintenance from "../pages/Maintenance/Maintenance";
import Audit from "../pages/Audit/Audit";
import Reports from "../pages/Reports/Reports";
import Notifications from "../pages/Notifications/Notifications";
import NotFound from "../pages/NotFound/NotFound";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization" element={<OrganizationSetup />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/allocation" element={<AllocationTransfer />} />
          <Route path="/booking" element={<ResourceBooking />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}