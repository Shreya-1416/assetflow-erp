import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import OrganizationTabs from "../../components/organization/OrganizationTabs";
import TopActions from "../../components/organization/TopActions";
import DepartmentTable from "../../components/organization/DepartmentTable";
import EmployeeTable from "../../components/organization/EmployeeTable";
import AddDepartmentModal from "../../components/organization/AddDepartmentModal";

function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState("Departments");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [deptRes, empRes] = await Promise.all([
        apiClient.get("/departments"),
        apiClient.get("/employees")
      ]);
      
      if (deptRes.success) {
        // Map backend keys to frontend keys
        const mappedDepts = deptRes.data.map(d => ({
          id: d._id,
          department: d.name,
          head: d.head ? d.head.name : "-",
          parent: "-",
          status: d.isActive ? "Active" : "Inactive"
        }));
        setDepartments(mappedDepts);
      }
      
      if (empRes.success) {
        setEmployees(empRes.data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch organization data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddDepartment = async (department) => {
    try {
      // department from modal contains: { department: "Name", head: "..." }
      const response = await apiClient.post("/departments", {
        name: department.department,
        description: department.description || "Added from UI",
        headId: department.headId || null
      });
      if (response.success) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (error) {
      alert("Failed to add department");
    }
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

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading data...</div>
      ) : (
        <>
          {activeTab === "Departments" && (
            <DepartmentTable departments={departments} />
          )}

          {activeTab === "Employees" && <EmployeeTable employees={employees} />}

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
        </>
      )}

      <AddDepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDepartment}
        employees={employees}
      />
    </div>
  );
}

export default OrganizationSetup;