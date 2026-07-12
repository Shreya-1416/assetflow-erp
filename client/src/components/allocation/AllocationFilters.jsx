import { FiSearch } from "react-icons/fi";

function AllocationFilters({ onAllocateClick }) {
  return (
    <div className="flex justify-between">
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-4 text-gray-400" />
        <input
          className="w-full rounded-lg border p-3 pl-11"
          placeholder="Search Allocation..."
        />
      </div>

      <button 
        onClick={onAllocateClick}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        + Allocate Asset
      </button>
    </div>
  );
}

export default AllocationFilters;