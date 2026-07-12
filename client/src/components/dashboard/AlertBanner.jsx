import { FiAlertTriangle } from "react-icons/fi";

function AlertBanner() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
      <div className="rounded-full bg-amber-100 p-3">
        <FiAlertTriangle className="text-2xl text-amber-600" />
      </div>

      <div>
        <h3 className="font-semibold text-amber-800">
          Attention Required
        </h3>

        <p className="text-sm text-amber-700">
          3 assets are overdue for return and require immediate follow-up.
        </p>
      </div>
    </div>
  );
}

export default AlertBanner;