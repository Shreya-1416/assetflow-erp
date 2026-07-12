import StatusBadge from "../organization/StatusBadge";

function AllocationTable() {

  const data = [
    {
      id:"AL001",
      asset:"Dell Laptop",
      employee:"Rahul Sharma",
      department:"Engineering",
      status:"Active"
    },
    {
      id:"AL002",
      asset:"Projector",
      employee:"Priya Singh",
      department:"HR",
      status:"Inactive"
    }
  ];

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

          {data.map((item)=>(
            <tr key={item.id} className="border-t">

              <td className="p-4">{item.id}</td>

              <td className="p-4">{item.asset}</td>

              <td className="p-4">{item.employee}</td>

              <td className="p-4">{item.department}</td>

              <td className="p-4 text-center">
                <StatusBadge status={item.status}/>
              </td>

              <td className="p-4 text-center">
                <button className="rounded bg-blue-100 px-4 py-2 text-blue-600">
                  Transfer
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AllocationTable;