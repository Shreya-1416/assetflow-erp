import { useState } from "react";

function AddDepartmentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    department: "",
    head: "",
    parent: "",
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
    if (!formData.department || !formData.head) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(formData);

    setFormData({
      department: "",
      head: "",
      parent: "",
      status: "Active",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="border-b px-8 py-5">
          <h2 className="text-2xl font-bold">
            Add Department
          </h2>
        </div>

        <div className="space-y-5 p-8">

          <div>
            <label className="mb-2 block font-medium">
              Department Name
            </label>

            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Department Head
            </label>

            <input
              name="head"
              value={formData.head}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Parent Department
            </label>

            <input
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-4 border-t px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Save Department
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddDepartmentModal;