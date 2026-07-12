import AuditStats from "../../components/audit/AuditStats";
import AuditFilters from "../../components/audit/AuditFilters";
import AuditTable from "../../components/audit/AuditTable";

function Audit() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">

        <h1 className="text-4xl font-bold text-slate-800">
          Audit Management
        </h1>

        <p className="mt-2 text-slate-500">
          Track and verify organizational assets through audit records.
        </p>
      </div>

      <AuditStats />

      <AuditFilters />

      <AuditTable />
    </div>
  );
}

export default Audit;