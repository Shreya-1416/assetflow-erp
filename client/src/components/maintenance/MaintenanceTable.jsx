import StatusBadge from "../organization/StatusBadge";

function MaintenanceTable() {
  const requests = [
    {
      id: "MR001",
      asset: "Dell Latitude 7420",
      technician: "Rahul Sharma",
      priority: "High",
      status: "Active",
    },
    {
      id: "MR002",
      asset: "HP LaserJet Pro",
      technician: "Priya Singh",
      priority: "Medium",
      status: "Inactive",
    },
    {
      id: "MR003",
      asset: "Conference Projector",
      technician: "Amit Verma",
      priority: "Low",
      status: "Active",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">

      <table className="w-full">

        <thead className="bg-slate-900 text-white">

          <tr>
            <th className="px-6 py-4 text-left">Request ID</th>
            <th className="px-6 py-4 text-left">Asset</th>
            <th className="px-6 py-4 text-left">Technician</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {requests.map((request) => (

            <tr
              key={request.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-6 py-4 font-medium">
                {request.id}
              </td>

              <td className="px-6 py-4">
                {request.asset}
              </td>

              <td className="px-6 py-4">
                {request.technician}
              </td>

              <td className="px-6 py-4">
                {request.priority}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={request.status} />
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

export default MaintenanceTable;