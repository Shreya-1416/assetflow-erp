import AssetCard from "../assets/AssetCard";

function MaintenanceStats({ requests = [] }) {
  const stats = [
    {
      title: "Pending",
      value: requests.filter(r => r.status === 'Pending').length,
      color: "text-orange-500",
    },
    {
      title: "In Progress",
      value: requests.filter(r => r.status === 'In Progress' || r.status === 'Technician Assigned').length,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: requests.filter(r => r.status === 'Completed').length,
      color: "text-green-600",
    },
    {
      title: "Overdue",
      value: 0, // This would require deeper date logic based on priority, let's keep it simple
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