import AllocationStats from "../../components/allocation/AllocationStats";
import AllocationFilters from "../../components/allocation/AllocationFilters";
import AllocationTable from "../../components/allocation/AllocationTable";
import { FiTool } from "react-icons/fi";

function AllocationTransfer() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Allocation & Transfer
        </h1>

        <p className="text-slate-500 mt-2">
          Allocate and transfer organizational assets.
        </p>
      </div>

      <AllocationStats />

      <AllocationFilters />

      <AllocationTable />
    </div>
  );
}

export default AllocationTransfer;