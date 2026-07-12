import AssetCard from "../assets/AssetCard";

function NotificationCards({ notifications = [] }) {
  const stats = [
    {
      title: "Unread",
      value: notifications.filter(n => !n.isRead).length,
      color: "text-blue-600",
    },
    {
      title: "Maintenance",
      value: notifications.filter(n => n.payload?.type === 'Maintenance').length,
      color: "text-orange-500",
    },
    {
      title: "Bookings",
      value: notifications.filter(n => n.payload?.type === 'Booking').length,
      color: "text-green-600",
    },
    {
      title: "Transfers",
      value: notifications.filter(n => n.payload?.type === 'Transfer').length,
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

export default NotificationCards;