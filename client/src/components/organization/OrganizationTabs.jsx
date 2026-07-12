function OrganizationTabs({ activeTab, setActiveTab }) {
  const tabs = ["Departments", "Employees", "Categories"];

  return (
    <div className="flex gap-4 border-b border-slate-200 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-300 hover:bg-slate-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default OrganizationTabs;