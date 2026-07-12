import { FiSearch } from "react-icons/fi";

function AuditFilters() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">

      <div className="relative w-full md:w-96">

        <FiSearch className="absolute left-4 top-4 text-slate-400" />

        <input
          type="text"
          placeholder="Search audit records..."
          className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4"
        />

      </div>

      <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
        + Start Audit
      </button>

    </div>
  );
}

export default AuditFilters;