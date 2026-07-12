import StatusBadge from "../organization/StatusBadge";

function AssetTable({ onView }) {
  const assets = [
    {
      id: "AST-001",
      name: "Dell Latitude 7420",
      category: "Laptop",
      department: "Engineering",
      assignedTo: "Rahul Sharma",
      purchaseDate: "10 Jan 2026",
      cost: "₹72,000",
      status: "Active",
    },
    {
      id: "AST-002",
      name: "Epson Projector",
      category: "Projector",
      department: "Operations",
      assignedTo: "Priya Singh",
      purchaseDate: "18 Mar 2026",
      cost: "₹48,000",
      status: "Active",
    },
    {
      id: "AST-003",
      name: "HP LaserJet Pro",
      category: "Printer",
      department: "Facilities",
      assignedTo: "Amit Verma",
      purchaseDate: "02 Feb 2026",
      cost: "₹25,000",
      status: "Inactive",
    },
    {
      id: "AST-004",
      name: "MacBook Pro M3",
      category: "Laptop",
      department: "Design",
      assignedTo: "Sneha Gupta",
      purchaseDate: "08 Apr 2026",
      cost: "₹1,75,000",
      status: "Active",
    },
    {
      id: "AST-005",
      name: "Cisco Router",
      category: "Networking",
      department: "IT",
      assignedTo: "Karan Malhotra",
      purchaseDate: "22 May 2026",
      cost: "₹38,500",
      status: "Active",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="min-w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Asset ID</th>
            <th className="px-6 py-4 text-left">Asset Name</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Assigned To</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-t transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-semibold text-slate-800">
                {asset.id}
              </td>

              <td className="px-6 py-4">{asset.name}</td>

              <td className="px-6 py-4">{asset.category}</td>

              <td className="px-6 py-4">{asset.department}</td>

              <td className="px-6 py-4">{asset.assignedTo}</td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={asset.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onView(asset)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    View
                  </button>

                  <button
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                  >
                    Edit
                  </button>

                  <button
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;