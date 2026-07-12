import StatusBadge from "../organization/StatusBadge";

function AuditTable({ cycles = [] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Audit ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Start Date</th>
            <th className="px-6 py-4 text-left">End Date</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {cycles.map((cycle) => (
            <tr key={cycle._id} className="border-t hover:bg-slate-50">
              <td className="px-6 py-4 font-medium font-mono text-xs text-slate-500">
                {cycle._id.substring(0, 8)}...
              </td>
              <td className="px-6 py-4">{cycle.name}</td>
              <td className="px-6 py-4">
                {new Date(cycle.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {new Date(cycle.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-center">
                <StatusBadge status={cycle.status === 'Closed' ? 'Inactive' : 'Active'} />
              </td>
              <td className="px-6 py-4 text-center">
                <button className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-600 hover:text-white transition">
                  View
                </button>
              </td>
            </tr>
          ))}
          {cycles.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                No audit cycles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuditTable;