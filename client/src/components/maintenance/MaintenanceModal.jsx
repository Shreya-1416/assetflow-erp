import { useState } from "react";
import { useForm } from "react-hook-form";

function MaintenanceModal({ isOpen, onClose, onSave, assets = [] }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      priority: "Medium"
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="border-b px-8 py-5">
          <h2 className="text-2xl font-bold">Raise Maintenance Request</h2>
        </div>

        <div className="p-8">
          <form id="maintenance-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">Select Asset *</label>
              <select
                {...register("asset", { required: true })}
                className="w-full rounded-lg border p-3 bg-white"
              >
                <option value="">-- Choose Asset --</option>
                {assets.map(a => (
                  <option key={a.id || a._id} value={a.id || a._id}>{a.name} ({a.assetTag})</option>
                ))}
              </select>
              {errors.asset && <span className="text-sm text-red-500">Asset is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">Priority *</label>
              <select
                {...register("priority", { required: true })}
                className="w-full rounded-lg border p-3 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Issue Description *</label>
              <textarea
                {...register("issueDescription", { required: true })}
                className="w-full rounded-lg border p-3"
                rows="4"
                placeholder="Describe the issue in detail..."
              ></textarea>
              {errors.issueDescription && <span className="text-sm text-red-500">Description is required</span>}
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-4 border-t px-8 py-5 bg-slate-50">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border px-5 py-2 bg-white hover:bg-slate-100"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="maintenance-form"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceModal;
