import StatusBadge from "./StatusBadge";

function DepartmentTable({ departments }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Department Head</th>
            <th className="px-6 py-4 text-left">Parent Department</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr
              key={dept.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium">
                {dept.department}
              </td>

              <td className="px-6 py-4">
                {dept.head}
              </td>

              <td className="px-6 py-4">
                {dept.parent}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={dept.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <button className="rounded bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-600 hover:text-white">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;