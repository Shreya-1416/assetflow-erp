import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className="relative w-80">
      <FiSearch className="absolute left-4 top-3.5 text-slate-400" />

      <input
        type="text"
        placeholder="Search department..."
        className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;