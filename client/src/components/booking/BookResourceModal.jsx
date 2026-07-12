import { useState } from "react";
import { useForm } from "react-hook-form";

function BookResourceModal({ isOpen, onClose, onSave, resources = [] }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
          <h2 className="text-2xl font-bold">Book Resource</h2>
        </div>

        <div className="p-8">
          <form id="book-resource-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">Resource *</label>
              <select
                {...register("resource", { required: true })}
                className="w-full rounded-lg border p-3 bg-white"
              >
                <option value="">-- Select Resource --</option>
                {resources.map(r => (
                  <option key={r.id || r._id} value={r.id || r._id}>{r.name} ({r.assetTag})</option>
                ))}
              </select>
              {errors.resource && <span className="text-sm text-red-500">Resource is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">Start Time *</label>
              <input
                type="datetime-local"
                {...register("startTime", { required: true })}
                className="w-full rounded-lg border p-3"
              />
              {errors.startTime && <span className="text-sm text-red-500">Start Time is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">End Time *</label>
              <input
                type="datetime-local"
                {...register("endTime", { required: true })}
                className="w-full rounded-lg border p-3"
              />
              {errors.endTime && <span className="text-sm text-red-500">End Time is required</span>}
            </div>
            
            <div>
              <label className="mb-2 block font-medium">Purpose / Notes</label>
              <textarea
                {...register("purpose")}
                className="w-full rounded-lg border p-3"
                rows="2"
                placeholder="Brief description for the booking..."
              ></textarea>
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
            form="book-resource-form"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Resource"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookResourceModal;
