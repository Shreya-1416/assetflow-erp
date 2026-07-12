import StatusBadge from "./StatusBadge";

function DepartmentTable() {
  const departments = [
    {
      id: 1,
      department: "Engineering",
      head: "Aditi Rao",
      parent: "-",
      status: "Active",
    },
    {
      id: 2,
      department: "Facilities",
      head: "Rohan Mehta",
      parent: "-",
      status: "Active",
    },
    {
      id: 3,
      department: "Field Operations",
      head: "Sana Iqbal",
      parent: "Operations",
      status: "Inactive",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
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
              className="border-t border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {dept.department}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {dept.head}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {dept.parent}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={dept.status} />
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-600 hover:text-white transition"
                >
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