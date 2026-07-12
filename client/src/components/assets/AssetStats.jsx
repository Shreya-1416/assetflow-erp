import AssetCard from "./AssetCard";

function AssetStats({ assets = [] }) {
  const stats = [
    {
      title: "Total Assets",
      value: assets.length,
      color: "text-blue-600",
    },
    {
      title: "Available",
      value: assets.filter(a => a.status === 'Available').length,
      color: "text-green-600",
    },
    {
      title: "Allocated",
      value: assets.filter(a => a.status === 'Allocated').length,
      color: "text-orange-500",
    },
    {
      title: "Maintenance",
      value: assets.filter(a => a.status === 'Maintenance').length,
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