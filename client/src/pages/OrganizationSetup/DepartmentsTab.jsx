import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

function DepartmentsTab() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/departments");
      if (res.success) setDepartments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    try {
      await apiClient.post("/departments", data);
      setIsModalOpen(false);
      reset();
      fetchDepartments();
    } catch (err) {
      alert("Failed to create department");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this department?")) {
      try {
        await apiClient.delete(`/departments/${id}`);
        fetchDepartments();
      } catch (err) {
        alert("Failed to delete department");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Departments</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus /> Add Department
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-4 text-slate-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-6 text-center text-slate-500">No departments found</td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr key={dept._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{dept.name}</td>
                    <td className="px-4 py-3">{dept.description || "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(dept._id)} className="text-red-500 hover:text-red-700 p-1"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Add Department</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input 
                  {...register("name", { required: true })} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  {...register("description")} 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentsTab;
