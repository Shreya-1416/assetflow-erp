import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

function RecentActivity() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await apiClient.get("/system/logs");
        if (response.success) {
          setLogs(response.data.slice(0, 5)); // Just take the 5 most recent
        }
      } catch (error) {
        console.error("Failed to fetch recent activity", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (localStorage.getItem("token")) {
      fetchLogs();
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>
      
      {isLoading ? (
        <div className="text-slate-500 py-4 text-center">Loading activity...</div>
      ) : logs.length === 0 ? (
        <div className="text-slate-500 py-4">No recent activity.</div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log._id} className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <span className="font-medium text-slate-800">{log.action}</span>
                <span className="text-xs text-slate-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-slate-600">{log.details || "No additional details"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;