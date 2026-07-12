import { FiRepeat } from "react-icons/fi";

import AllocationStats from "../../components/allocation/AllocationStats";
import AllocationFilters from "../../components/allocation/AllocationFilters";
import AllocationTable from "../../components/allocation/AllocationTable";

function AllocationTransfer() {
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <FiRepeat size={28} />
            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Allocation & Transfer
              </h1>

              <p className="mt-1 text-slate-500">
                Allocate, transfer and monitor organizational assets.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* KPI Cards */}
      <AllocationStats />

      {/* Search & Actions */}
      <AllocationFilters />

      {/* Table */}
      <AllocationTable />

    </div>
  );
}

export default AllocationTransfer;