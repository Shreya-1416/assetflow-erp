import MaintenanceStats from "../../components/maintenance/MaintenanceStats";
import MaintenanceFilters from "../../components/maintenance/MaintenanceFilters";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";

function Maintenance() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">

        <h1 className="text-4xl font-bold text-slate-800">
          Maintenance Management
        </h1>

        <p className="mt-2 text-slate-500">
          Track, assign and monitor maintenance requests.
        </p>
      </div>

      <MaintenanceStats />

      <MaintenanceFilters />

      <MaintenanceTable />
    </div>
  );
}

export default Maintenance;