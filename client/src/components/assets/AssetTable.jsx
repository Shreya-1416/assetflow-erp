import StatusBadge from "../organization/StatusBadge";

function AssetTable({ onView }) {
  const assets = [
    {
      id: "AST-001",
      name: "Dell Latitude 7420",
      category: "Laptop",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "AST-002",
      name: "Epson Projector",
      category: "Projector",
      department: "Operations",
      status: "Active",
    },
    {
      id: "AST-003",
      name: "HP LaserJet Pro",
      category: "Printer",
      department: "Facilities",
      status: "Inactive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Asset ID</th>
            <th className="px-6 py-4 text-left">Asset Name</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">{asset.id}</td>
              <td className="px-6 py-4">{asset.name}</td>
              <td className="px-6 py-4">{asset.category}</td>
              <td className="px-6 py-4">{asset.department}</td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={asset.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <button
  onClick={() => onView(asset)}
  className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 transition hover:bg-blue-600 hover:text-white"
>
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

export default AssetTable;