import AssetCard from "../assets/AssetCard";

function ReportStats() {
  const stats = [
    {
      title: "Assets",
      value: 256,
      color: "text-blue-600",
    },
    {
      title: "Bookings",
      value: 84,
      color: "text-green-600",
    },
    {
      title: "Maintenance",
      value: 18,
      color: "text-orange-500",
    },
    {
      title: "Audits",
      value: 56,
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