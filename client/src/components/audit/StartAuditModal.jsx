import { useState } from "react";
import { useForm } from "react-hook-form";

function StartAuditModal({ isOpen, onClose, onSave, employees = [] }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // API expects assignedAuditors as an array of IDs
      const payload = {
        ...data,
        assignedAuditors: [data.assignedAuditor] // Single select for simplicity, mapped to array
      };
      await onSave(payload);
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
          <h2 className="text-2xl font-bold">Start New Audit Cycle</h2>
        </div>

        <div className="p-8">
          <form id="start-audit-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">Audit Name *</label>
              <input
                {...register("name", { required: true })}
                className="w-full rounded-lg border p-3"
                placeholder="e.g. Q3 2024 Inventory Audit"
              />
              {errors.name && <span className="text-sm text-red-500">Name is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">Start Date *</label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="w-full rounded-lg border p-3"
              />
              {errors.startDate && <span className="text-sm text-red-500">Start Date is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">End Date *</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="w-full rounded-lg border p-3"
              />
              {errors.endDate && <span className="text-sm text-red-500">End Date is required</span>}
            </div>

            <div>
              <label className="mb-2 block font-medium">Assign Lead Auditor *</label>
              <select
                {...register("assignedAuditor", { required: true })}
                className="w-full rounded-lg border p-3 bg-white"
              >
                <option value="">-- Choose Auditor --</option>
                {employees.map(e => (
                  <option key={e.id || e._id} value={e.id || e._id}>{e.name} ({e.email})</option>
                ))}
              </select>
              {errors.assignedAuditor && <span className="text-sm text-red-500">Auditor is required</span>}
            </div>
            
            <div>
              <label className="mb-2 block font-medium">Description</label>
              <textarea
                {...register("description")}
                className="w-full rounded-lg border p-3"
                rows="3"
                placeholder="Details or scope of this audit..."
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
            form="start-audit-form"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Starting..." : "Start Audit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartAuditModal;
