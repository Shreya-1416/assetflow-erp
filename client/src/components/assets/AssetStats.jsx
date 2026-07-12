import AssetCard from "./AssetCard";

function AssetStats() {
  const stats = [
    {
      title: "Total Assets",
      value: 256,
      color: "text-blue-600",
    },
    {
      title: "Available",
      value: 178,
      color: "text-green-600",
    },
    {
      title: "Allocated",
      value: 62,
      color: "text-orange-500",
    },
    {
      title: "Maintenance",
      value: 16,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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

export default AssetStats;