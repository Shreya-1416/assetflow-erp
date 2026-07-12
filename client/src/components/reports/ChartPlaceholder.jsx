function ChartPlaceholder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div className="h-80 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xl text-slate-500 shadow">
        Asset Analytics Chart
      </div>

      <div className="h-80 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xl text-slate-500 shadow">
        Booking Analytics Chart
      </div>

    </div>
  );
}

export default ChartPlaceholder;