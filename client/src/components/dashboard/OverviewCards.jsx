import { useState, useEffect } from "react";
import {
  FiBox,
  FiCheckCircle,
  FiTool,
  FiCalendar,
  FiRepeat,
  FiClock,
} from "react-icons/fi";
import apiClient from "../../api/apiClient";
import StatsCard from "./StatsCard";

function OverviewCards() {
  const [kpiData, setKpiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await apiClient.get("/dashboard/kpis");
        if (response.success) {
          setKpiData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard KPIs", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (localStorage.getItem("token")) {
      fetchKPIs();
    }
  }, []);

  if (isLoading) {
    return <div className="text-slate-500 text-center py-4">Loading stats...</div>;
  }

  const stats = [
    {
      title: "Available Assets",
      value: kpiData?.assetsAvailableCount || 0,
      icon: <FiBox />,
      color: "bg-blue-600",
    },
    {
      title: "Allocated Assets",
      value: kpiData?.assetsAllocatedCount || 0,
      icon: <FiCheckCircle />,
      color: "bg-green-600",
    },
    {
      title: "Maintenance Today",
      value: kpiData?.maintenanceTodayCount || 0,
      icon: <FiTool />,
      color: "bg-orange-500",
    },
    {
      title: "Active Bookings",
      value: kpiData?.activeBookingsCount || 0,
      icon: <FiCalendar />,
      color: "bg-purple-600",
    },
    {
      title: "Pending Transfers",
      value: kpiData?.pendingTransfersCount || 0,
      icon: <FiRepeat />,
      color: "bg-red-500",
    },
    {
      title: "Upcoming Returns",
      value: kpiData?.upcomingReturnsCount || 0,
      icon: <FiClock />,
      color: "bg-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((item) => (
        <StatsCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default OverviewCards;