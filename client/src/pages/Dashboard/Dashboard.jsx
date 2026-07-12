import OverviewCards from "../../components/dashboard/OverviewCards";
import AlertBanner from "../../components/dashboard/AlertBanner";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back, Admin 👋
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            12 July 2026
          </p>
        </div>
      </div>

      <AlertBanner />

      <OverviewCards />

      <QuickActions />

      <RecentActivity />
    </div>
  );
}

export default Dashboard;