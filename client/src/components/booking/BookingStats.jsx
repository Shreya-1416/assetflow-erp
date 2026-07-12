import AssetCard from "../assets/AssetCard";

function BookingStats({ bookings = [] }) {
  const stats = [
    {
      title: "Today's Bookings",
      value: bookings.filter(b => {
        const today = new Date();
        const start = new Date(b.startTime);
        return start.getDate() === today.getDate() && start.getMonth() === today.getMonth();
      }).length,
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: bookings.filter(b => b.status === 'Ongoing').length,
      color: "text-green-600",
    },
    {
      title: "Completed",
      value: bookings.filter(b => b.status === 'Completed').length,
      color: "text-orange-500",
    },
    {
      title: "Cancelled",
      value: bookings.filter(b => b.status === 'Cancelled').length,
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