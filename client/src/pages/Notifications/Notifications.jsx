import NotificationCards from "../../components/notifications/NotificationCards";
import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationTable from "../../components/notifications/NotificationTable";

function Notifications() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">

        <h1 className="text-4xl font-bold text-slate-800">
          Notifications
        </h1>

        <p className="mt-2 text-slate-500">
          Stay updated with important system alerts and activities.
        </p>
      </div>

      <NotificationCards />

      <NotificationFilters />

      <NotificationTable />
    </div>
  );
}

export default Notifications;