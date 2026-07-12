import { useState } from "react";
import DepartmentsTab from "./DepartmentsTab";
import CategoriesTab from "./CategoriesTab";
import EmployeesTab from "./EmployeesTab";

function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState("departments");

  const tabs = [
    { id: "departments", label: "Departments" },
    { id: "categories", label: "Categories" },
    { id: "employees", label: "Employees" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Organization Setup</h1>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        {activeTab === "departments" && <DepartmentsTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "employees" && <EmployeesTab />}
      </div>
    </div>
  );
}

export default OrganizationSetup;