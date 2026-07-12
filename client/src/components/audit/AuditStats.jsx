import AssetCard from "../assets/AssetCard";

function AuditStats() {
  const stats = [
    {
      title: "Audited",
      value: 185,
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: 32,
      color: "text-orange-500",
    },
    {
      title: "Mismatch",
      value: 9,
      color: "text-red-600",
    },
    {
      title: "Missing",
      value: 3,
      color: "text-blue-600",
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

export default AuditStats;