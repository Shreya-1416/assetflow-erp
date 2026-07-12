import AssetCard from "../assets/AssetCard";

function AllocationStats() {
  const stats = [
    {
      title: "Allocated",
      value: 164,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: 14,
      color: "text-orange-500",
    },
    {
      title: "Transferred",
      value: 58,
      color: "text-green-600",
    },
    {
      title: "Returned",
      value: 43,
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