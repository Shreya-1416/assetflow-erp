function StatsCard({ title, value, icon, color }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Top Accent */}
      <div className={`absolute left-0 top-0 h-1 w-full ${color}`} />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">

            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              ▲ +12%
            </span>

            <span className="text-xs text-slate-400">
              compared to last month
            </span>

          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;