import { useState } from "react";
import OrganizationTabs from "../../components/organization/OrganizationTabs";
import TopActions from "../../components/organization/TopActions";
import DepartmentTable from "../../components/organization/DepartmentTable";
import EmployeeTable from "../../components/organization/EmployeeTable";
import AddDepartmentModal from "../../components/organization/AddDepartmentModal";

function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState("Departments");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [departments, setDepartments] = useState([
    {
      id: 1,
      department: "Engineering",
      head: "Aditi Rao",
      parent: "-",
      status: "Active",
    },
    {
      id: 2,
      department: "Facilities",
      head: "Rohan Mehta",
      parent: "-",
      status: "Active",
    },
    {
      id: 3,
      department: "Field Operations",
      head: "Sana Iqbal",
      parent: "Operations",
      status: "Inactive",
    },
  ]);

  const handleAddDepartment = (department) => {
  setDepartments((prev) => [
    ...prev,
    {
      id: Date.now(),
      ...department,
    },
  ]);
};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Organization Setup
        </h1>

        <p className="mt-2 text-slate-500">
          Manage departments, employees, and organizational structure.
        </p>
      </div>

      <OrganizationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <TopActions
        onAddDepartment={() => setIsModalOpen(true)}
      />

      {activeTab === "Departments" && (
        <DepartmentTable departments={departments} />
      )}

      {activeTab === "Employees" && <EmployeeTable />}

      {activeTab === "Categories" && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <h2 className="text-2xl font-semibold">
            Categories Module
          </h2>

          <p className="mt-3 text-slate-500">
            This section will be implemented soon.
          </p>
        </div>
      )}

      <AddDepartmentModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSave={handleAddDepartment}
/>
    </div>
  );
}

export default OrganizationSetup;