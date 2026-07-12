import { FiBell, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-2xl font-semibold">
        AssetFlow
      </h2>

      <div className="flex items-center gap-5">

        <FiBell className="text-2xl cursor-pointer" />

        <FiUser className="text-2xl cursor-pointer" />

      </div>

    </header>
  );
}

export default Navbar;