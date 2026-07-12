import StatusBadge from "../organization/StatusBadge";

function AssetTable({ assets = [], onView }) {
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
              key={asset._id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">{asset.serialNumber}</td>
              <td className="px-6 py-4">{asset.name}</td>
              <td className="px-6 py-4">{asset.category?.name || "-"}</td>
              <td className="px-6 py-4">{asset.department?.name || "-"}</td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={asset.status === 'Available' ? 'Active' : 'Inactive'} />
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
          {assets.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                No assets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;