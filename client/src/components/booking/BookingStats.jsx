import AssetCard from "../assets/AssetCard";

function BookingStats() {
  const stats = [
    {
      title: "Today's Bookings",
      value: 18,
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: 12,
      color: "text-green-600",
    },
    {
      title: "Completed",
      value: 41,
      color: "text-orange-500",
    },
    {
      title: "Cancelled",
      value: 5,
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

export default BookingStats;