function AssetDetailsDrawer({ isOpen, onClose, asset }) {
  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="h-full w-full max-w-md bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            Asset Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <h3 className="text-sm text-slate-500">Asset ID</h3>
            <p className="font-semibold">{asset.id}</p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">Asset Name</h3>
            <p className="font-semibold">{asset.name}</p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">Category</h3>
            <p>{asset.category}</p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">Department</h3>
            <p>{asset.department}</p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">Status</h3>
            <p>{asset.status}</p>
          </div>

          <div>
            <h3 className="text-sm text-slate-500">
              QR Code
            </h3>

            <div className="mt-3 flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
              QR Code Placeholder
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AssetDetailsDrawer;