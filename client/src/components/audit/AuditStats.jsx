import AssetCard from "../assets/AssetCard";

function AuditStats({ cycles = [] }) {
  const stats = [
    {
      title: "Total Cycles",
      value: cycles.length,
      color: "text-blue-600",
    },
    {
      title: "Open",
      value: cycles.filter(c => c.status === 'Open').length,
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: cycles.filter(c => c.status === 'In Progress').length,
      color: "text-orange-500",
    },
    {
      title: "Closed",
      value: cycles.filter(c => c.status === 'Closed').length,
      color: "text-slate-600",
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