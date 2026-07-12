import {
  FiBox,
  FiCheckCircle,
  FiTool,
  FiCalendar,
  FiRepeat,
  FiClock,
} from "react-icons/fi";

import StatsCard from "./StatsCard";

function OverviewCards() {
  const stats = [
    {
      title: "Available Assets",
      value: 128,
      icon: <FiBox />,
      color: "bg-blue-600",
    },
    {
      title: "Allocated Assets",
      value: 76,
      icon: <FiCheckCircle />,
      color: "bg-green-600",
    },
    {
      title: "Maintenance Today",
      value: 4,
      icon: <FiTool />,
      color: "bg-orange-500",
    },
    {
      title: "Active Bookings",
      value: 12,
      icon: <FiCalendar />,
      color: "bg-purple-600",
    },
    {
      title: "Pending Transfers",
      value: 5,
      icon: <FiRepeat />,
      color: "bg-red-500",
    },
    {
      title: "Upcoming Returns",
      value: 9,
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