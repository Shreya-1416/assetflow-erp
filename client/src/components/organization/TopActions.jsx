import SearchBar from "./SearchBar";

function TopActions({ onAddDepartment }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchBar />

      <button
        onClick={onAddDepartment}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        + Add Department
      </button>
    </div>
  );
}

export default TopActions;