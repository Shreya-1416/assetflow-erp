import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";

function AllocateAssetModal({ isOpen, onClose, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableAssets, setAvailableAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOptions();
    } else {
      reset();
    }
  }, [isOpen]);

  const fetchOptions = async () => {
    setIsLoadingData(true);
    try {
      const [assetsRes, empRes] = await Promise.all([
        apiClient.get("/assets?status=Available"), // Assume API supports filtering by status
        apiClient.get("/employees")
      ]);
      if (assetsRes.success) setAvailableAssets(assetsRes.data.assets || []);
      if (empRes.success) setEmployees(empRes.data.items || []);
    } catch (err) {
      console.error("Failed to fetch options for allocation", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/allocations", data);
      if (response.success) {
        onSuccess();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to allocate asset");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-slate-800">Allocate Asset</h2>
        
        {isLoadingData ? (
          <div className="py-8 text-center text-slate-500">Loading data...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Select Asset *</label>
              <select 
                {...register("assetId", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
              >
                <option value="">-- Choose Asset --</option>
                {availableAssets.map(a => (
                  <option key={a._id} value={a._id}>{a.name} ({a.serialNumber})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Allocate To *</label>
              <select 
                {...register("allocatedTo", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
              >
                <option value="">-- Choose Employee --</option>
                {employees.map(e => (
                  <option key={e._id} value={e._id}>{e.name} - {e.department || 'No Dept'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Expected Return Date *</label>
              <input 
                type="date"
                {...register("expectedReturnDate", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
              <textarea 
                {...register("notes")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                rows="2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Allocating..." : "Allocate Asset"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AllocateAssetModal;
