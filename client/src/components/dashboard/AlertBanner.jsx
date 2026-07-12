import {
  FiAlertTriangle,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";

function AlertBanner() {
  return (
    <div className="overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">

      <div className="flex items-center justify-between p-6">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100">
            <FiAlertTriangle className="text-4xl text-amber-600" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-amber-900">
              Attention Required
            </h2>

            <p className="mt-2 text-sm text-amber-700">
              Three organizational assets are overdue for return.
              Please review the pending allocations to avoid
              compliance issues.
            </p>

            <div className="mt-3 flex items-center gap-5 text-sm text-amber-800">

              <div className="flex items-center gap-2">
                <FiClock />
                Overdue Assets : 3
              </div>

              <div className="flex items-center gap-2">
                Last Updated : Today
              </div>

            </div>

          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white transition hover:bg-amber-700">

          View Details

          <FiArrowRight />

        </button>

      </div>

    </div>
  );
}

export default AlertBanner;