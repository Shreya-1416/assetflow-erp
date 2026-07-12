import StatusBadge from "./StatusBadge";

function DepartmentTable({
  departments,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="min-w-full">
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
          {departments.length > 0 ? (
            departments.map((dept) => (
              <tr
                key={dept.id}
                className="border-t transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-semibold text-slate-800">
                  {dept.department}
                </td>

                <td className="px-6 py-4">
                  {dept.head}
                </td>

                <td className="px-6 py-4">
                  {dept.parent || "-"}
                </td>

                <td className="px-6 py-4 text-center">
                  <StatusBadge status={dept.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">

                    <button
                      onClick={() => onEdit(dept)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(dept.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-slate-500"
              >
                No departments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;