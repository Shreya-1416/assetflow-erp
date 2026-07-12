import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import NotificationCards from "../../components/notifications/NotificationCards";
import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationTable from "../../components/notifications/NotificationTable";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/system/notifications");
      if (response.success) {
        setNotifications(response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Notifications
        </h1>

        <p className="mt-2 text-slate-500">
          Stay updated with important system alerts and activities.
        </p>
      </div>

      <NotificationCards notifications={notifications} />

      <NotificationFilters />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading notifications...</div>
      ) : (
        <NotificationTable notifications={notifications} />
      )}
    </div>
  );
}

export default Notifications;