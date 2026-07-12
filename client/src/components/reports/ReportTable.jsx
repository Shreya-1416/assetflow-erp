import apiClient from "../../api/apiClient";

function ReportTable() {
  const reports = [
    {
      id: "RP-UTIL",
      name: "Asset Utilization Report",
      endpoint: "/reports/asset-utilization",
      type: "JSON",
    },
    {
      id: "RP-MAINT",
      name: "Maintenance Frequency Report",
      endpoint: "/reports/maintenance-frequency",
      type: "JSON",
    },
    {
      id: "RP-DEPT",
      name: "Department Allocation Summary",
      endpoint: "/reports/department-allocation",
      type: "JSON",
    },
  ];

  const handleDownload = async (endpoint, name) => {
    try {
      const response = await apiClient.get(endpoint);
      if (response.success) {
        // Create a downloadable JSON blob
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response.data, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", name.replace(/ /g, "_") + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    } catch (err) {
      console.error("Failed to download report", err);
      alert("Failed to download report.");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Report ID</th>
            <th className="px-6 py-4 text-left">Report Name</th>
            <th className="px-6 py-4 text-left">Type</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t hover:bg-slate-50">
              <td className="px-6 py-4 font-medium">{report.id}</td>
              <td className="px-6 py-4">{report.name}</td>
              <td className="px-6 py-4">{report.type}</td>
              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => handleDownload(report.endpoint, report.name)}
                  className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-600 hover:text-white"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;