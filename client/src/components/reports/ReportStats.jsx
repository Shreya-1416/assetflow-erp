import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import AssetCard from "../assets/AssetCard";

function ReportStats() {
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await apiClient.get("/dashboard/kpis");
        if (response.success) {
          setKpiData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch KPIs", error);
      }
    };
    fetchKPIs();
  }, []);

  const stats = [
    {
      title: "Total Assets",
      value: (kpiData?.assetsAvailableCount || 0) + (kpiData?.assetsAllocatedCount || 0),
      color: "text-blue-600",
    },
    {
      title: "Active Bookings",
      value: kpiData?.activeBookingsCount || 0,
      color: "text-green-600",
    },
    {
      title: "Maintenance Today",
      value: kpiData?.maintenanceTodayCount || 0,
      color: "text-orange-500",
    },
    {
      title: "Pending Transfers",
      value: kpiData?.pendingTransfersCount || 0,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <AssetCard
          key={item.title}
          title={item.title}
          value={item.value}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default ReportStats;