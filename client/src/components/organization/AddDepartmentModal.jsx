import { useState } from "react";

function AddDepartmentModal({ isOpen, onClose, onSave, employees = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headId: "",
    status: "Active",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert("Please fill the department name.");
      return;
    }

    onSave(formData);

    setFormData({
      name: "",
      description: "",
      headId: "",
      status: "Active",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="border-b px-8 py-5">
          <h2 className="text-2xl font-bold">Add Department</h2>
        </div>

        <div className="space-y-5 p-8">
          <div>
            <label className="mb-2 block font-medium">Department Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              placeholder="e.g. Engineering"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              rows="2"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Department Head</label>
            <select
              name="headId"
              value={formData.headId}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 bg-white"
            >
              <option value="">-- No Head Assigned --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Save Department
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDepartmentModal;