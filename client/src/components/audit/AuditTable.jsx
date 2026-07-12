import StatusBadge from "../organization/StatusBadge";

function AuditTable() {

  const audits = [
    {
      id: "AU001",
      asset: "Dell Latitude 7420",
      department: "Engineering",
      result: "Verified",
      status: "Active",
    },
    {
      id: "AU002",
      asset: "Projector",
      department: "HR",
      result: "Mismatch",
      status: "Inactive",
    },
    {
      id: "AU003",
      asset: "HP Printer",
      department: "Finance",
      result: "Verified",
      status: "Active",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">

      <table className="w-full">

        <thead className="bg-slate-900 text-white">

          <tr>

            <th className="px-6 py-4 text-left">Audit ID</th>

            <th className="px-6 py-4 text-left">Asset</th>

            <th className="px-6 py-4 text-left">Department</th>

            <th className="px-6 py-4 text-left">Result</th>

            <th className="px-6 py-4 text-center">Status</th>

            <th className="px-6 py-4 text-center">Action</th>

          </tr>

        </thead>

        <tbody>

          {audits.map((audit) => (

            <tr key={audit.id} className="border-t hover:bg-slate-50">

              <td className="px-6 py-4 font-medium">
                {audit.id}
              </td>

              <td className="px-6 py-4">
                {audit.asset}
              </td>

              <td className="px-6 py-4">
                {audit.department}
              </td>

              <td className="px-6 py-4">
                {audit.result}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={audit.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <button className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-600 hover:text-white">
                  View
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AuditTable;