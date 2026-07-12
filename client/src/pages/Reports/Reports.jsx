import ReportStats from "../../components/reports/ReportStats";
import ReportFilters from "../../components/reports/ReportFilters";
import ChartPlaceholder from "../../components/reports/ChartPlaceholder";
import ReportTable from "../../components/reports/ReportTable";

function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Analyze organizational assets and generate business reports.
        </p>
      </div>

      <ReportStats />

      <ReportFilters />

      <ChartPlaceholder />

      <ReportTable />
    </div>
  );
}

export default Reports;