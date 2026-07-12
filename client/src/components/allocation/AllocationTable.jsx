import StatusBadge from "../organization/StatusBadge";

function AllocationTable({ allocations = [] }) {
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Asset</th>
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {allocations.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 text-xs font-mono text-slate-500">{item.id.substring(0, 8)}...</td>
              <td className="p-4 font-medium">{item.asset?.name || "-"}</td>
              <td className="p-4">{item.allocatedTo?.name || "-"}</td>
              <td className="p-4">{item.allocatedTo?.department || "-"}</td>

              <td className="p-4 text-center">
                <StatusBadge status={item.status} />
              </td>

              <td className="p-4 text-center">
                <button className="rounded bg-blue-100 px-4 py-2 text-sm text-blue-600 transition hover:bg-blue-600 hover:text-white">
                  Transfer
                </button>
              </td>
            </tr>
          ))}
          {allocations.length === 0 && (
            <tr>
              <td colSpan="6" className="p-8 text-center text-slate-500">
                No active allocations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllocationTable;