function AssetDetailsDrawer({ isOpen, onClose, asset }) {
  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="h-screen w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Asset Details
            </h2>
            <p className="text-sm text-slate-500">
              Enterprise Asset Information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-xl hover:bg-red-500 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          {/* Asset Image */}
          <div className="flex justify-center">
            <div className="flex h-44 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
              <span className="text-slate-400">
                Asset Image
              </span>
            </div>
          </div>

          {/* Asset Information */}
          <div className="rounded-xl border border-slate-200 p-5">

            <h3 className="mb-4 text-lg font-semibold">
              General Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Asset ID
                </p>

                <p className="font-semibold">
                  {asset.id}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Category
                </p>

                <p className="font-semibold">
                  {asset.category}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Asset Name
                </p>

                <p className="font-semibold">
                  {asset.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">
                  Department
                </p>

                <p className="font-semibold">
                  {asset.department}
                </p>
              </div>

            </div>

          </div>

          {/* Assignment */}
          <div className="rounded-xl border border-slate-200 p-5">

            <h3 className="mb-4 text-lg font-semibold">
              Assignment
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Assigned To
                </span>

                <span className="font-medium">
                  Rahul Sharma
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Location
                </span>

                <span className="font-medium">
                  Engineering Floor
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Status
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {asset.status}
                </span>
              </div>

            </div>

          </div>

          {/* Purchase Details */}
          <div className="rounded-xl border border-slate-200 p-5">

            <h3 className="mb-4 text-lg font-semibold">
              Purchase Details
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Purchase Date
                </span>

                <span>
                  10 Jan 2026
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Warranty
                </span>

                <span>
                  3 Years
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Cost
                </span>

                <span>
                  ₹72,000
                </span>
              </div>

            </div>

          </div>

          {/* QR */}
          <div className="rounded-xl border border-slate-200 p-5">

            <h3 className="mb-4 text-lg font-semibold">
              QR Code
            </h3>

            <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
              QR Code Placeholder
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AssetDetailsDrawer;