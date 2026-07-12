function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>

          <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;