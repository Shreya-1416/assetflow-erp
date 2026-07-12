import AssetCard from "../assets/AssetCard";

function NotificationCards() {

  const stats = [
    {
      title: "Unread",
      value: 8,
      color: "text-blue-600",
    },
    {
      title: "Maintenance",
      value: 5,
      color: "text-orange-500",
    },
    {
      title: "Bookings",
      value: 12,
      color: "text-green-600",
    },
    {
      title: "Transfers",
      value: 3,
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