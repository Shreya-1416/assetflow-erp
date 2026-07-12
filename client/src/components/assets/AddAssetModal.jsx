import { useState } from "react";
import { useForm } from "react-hook-form";

function AddAssetModal({ isOpen, onClose, onSave, categories = [], departments = [] }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      status: "Available",
      condition: "Good"
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
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="border-b px-8 py-5 shrink-0">
          <h2 className="text-2xl font-bold">Add New Asset</h2>
        </div>

        <div className="overflow-y-auto p-8">
          <form id="add-asset-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-2 block font-medium">Asset Name *</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. MacBook Pro M3"
                />
                {errors.name && <span className="text-sm text-red-500">Name is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-medium">Serial Number *</label>
                <input
                  {...register("serialNumber", { required: true })}
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. C02YMXXXXX"
                />
                {errors.serialNumber && <span className="text-sm text-red-500">Serial number is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-medium">Category *</label>
                <select
                  {...register("categoryId", { required: true })}
                  className="w-full rounded-lg border p-3 bg-white"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map(c => (
                    <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <span className="text-sm text-red-500">Category is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-medium">Department *</label>
                <select
                  {...register("departmentId", { required: true })}
                  className="w-full rounded-lg border p-3 bg-white"
                >
                  <option value="">-- Select Department --</option>
                  {departments.map(d => (
                    <option key={d.id || d._id} value={d.id || d._id}>{d.name || d.department}</option>
                  ))}
                </select>
                {errors.departmentId && <span className="text-sm text-red-500">Department is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-medium">Location *</label>
                <input
                  {...register("location", { required: true })}
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. NY Office - 3rd Floor"
                />
                {errors.location && <span className="text-sm text-red-500">Location is required</span>}
              </div>

              <div>
                <label className="mb-2 block font-medium">Manufacturer</label>
                <input
                  {...register("manufacturer")}
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. Apple"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Model</label>
                <input
                  {...register("model")}
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. A2992"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Status</label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border p-3 bg-white"
                >
                  <option value="Available">Available</option>
                  <option value="Allocated">Allocated</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">Condition</label>
                <select
                  {...register("condition")}
                  className="w-full rounded-lg border p-3 bg-white"
                >
                  <option value="New">New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">Purchase Date</label>
                <input
                  type="date"
                  {...register("purchaseDate")}
                  className="w-full rounded-lg border p-3"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block font-medium">Description</label>
              <textarea
                {...register("description")}
                className="w-full rounded-lg border p-3"
                rows="2"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="flex justify-end gap-4 border-t px-8 py-5 shrink-0 bg-slate-50">
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
            form="add-asset-form"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Asset"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAssetModal;
