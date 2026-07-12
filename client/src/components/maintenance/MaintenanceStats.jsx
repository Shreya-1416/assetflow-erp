import AssetCard from "../assets/AssetCard";

function MaintenanceStats() {
  const stats = [
    {
      title: "Pending",
      value: 14,
      color: "text-orange-500",
    },
    {
      title: "In Progress",
      value: 8,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: 64,
      color: "text-green-600",
    },
    {
      title: "Overdue",
      value: 3,
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

export default MaintenanceStats;