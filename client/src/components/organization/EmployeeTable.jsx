import StatusBadge from "./StatusBadge";

function EmployeeTable({ employees = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp._id}
              className="border-t border-slate-200 hover:bg-slate-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {emp.name}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {emp.email}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {emp.role}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {emp.department || "-"}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusBadge status={emp.isActive ? "Active" : "Inactive"} />
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
          {employees.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;