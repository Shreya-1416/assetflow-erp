import { FiBox } from "react-icons/fi";

function Logo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-20 w-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
        <FiBox className="text-4xl text-white" />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          AssetFlow
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Enterprise Asset Management System
        </p>
      </div>
    </div>
  );
}

export default Logo;