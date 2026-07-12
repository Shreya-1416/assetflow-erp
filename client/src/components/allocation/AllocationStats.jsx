import AssetCard from "../assets/AssetCard";

function AllocationStats({ allocations = [] }) {
  const stats = [
    {
      title: "Allocated",
      value: allocations.filter(a => a.status === 'Active').length,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: 0,
      color: "text-orange-500",
    },
    {
      title: "Transferred",
      value: 0,
      color: "text-green-600",
    },
    {
      title: "Returned",
      value: allocations.filter(a => a.status === 'Returned').length,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => (
        <AssetCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}

export default AllocationStats;