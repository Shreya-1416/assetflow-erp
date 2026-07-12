import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";
import { FiPlus, FiBox, FiSearch } from "react-icons/fi";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [assetsRes, deptsRes, catsRes] = await Promise.all([
        apiClient.get("/assets"),
        apiClient.get("/departments"),
        apiClient.get("/categories")
      ]);
      
      if (assetsRes.success) setAssets(assetsRes.data.assets || []);
      if (deptsRes.success) setDepartments(deptsRes.data);
      if (catsRes.success) setCategories(catsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("serialNumber", data.serialNumber);
      formData.append("categoryId", data.categoryId);
      formData.append("departmentId", data.departmentId);
      formData.append("location", data.location);
      if (data.condition) formData.append("condition", data.condition);
      if (data.status) formData.append("status", data.status);
      if (data.description) formData.append("description", data.description);

      // We're omitting photos for now to keep it simple, but the backend accepts multipart/form-data
      
      // We must manually set the headers for formData so axios knows, 
      // although axios usually handles it automatically when passing FormData
      const response = await apiClient.post("/assets", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.success) {
        setIsModalOpen(false);
        reset();
        fetchInitialData();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to register asset");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Assets Directory</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus /> Register Asset
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full border border-slate-300 rounded-lg py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-slate-500">Loading assets...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-800 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Serial Number</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                </tr>
              </thead>
              <tbody>
                {assets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                      <FiBox className="mx-auto text-4xl mb-2 text-slate-300" />
                      <p>No assets found</p>
                    </td>
                  </tr>
                ) : (
                  assets.map((asset) => (
                    <tr key={asset._id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{asset.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{asset.serialNumber}</td>
                      <td className="px-4 py-3">{asset.category?.name || "-"}</td>
                      <td className="px-4 py-3">{asset.department?.name || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${asset.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{asset.condition}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 m-auto">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Register New Asset</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Asset Name *</label>
                  <input 
                    {...register("name", { required: true })} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                    placeholder="e.g. MacBook Pro M2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number *</label>
                  <input 
                    {...register("serialNumber", { required: true })} 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                  <select {...register("categoryId", { required: true })} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
                  <select {...register("departmentId", { required: true })} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white">
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                <input 
                  {...register("location", { required: true })} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                  placeholder="e.g. HQ - Floor 3"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                  <select {...register("condition")} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white">
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select {...register("status")} className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white">
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  {...register("description")} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assets;