function ReportFilters() {
  return (
    <div className="flex flex-wrap gap-4">

      <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Export PDF
      </button>

      <button className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
        Export CSV
      </button>

      <button className="rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-900">
        Download Report
      </button>

    </div>
  );
}

export default ReportFilters;