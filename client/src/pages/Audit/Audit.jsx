import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import AuditStats from "../../components/audit/AuditStats";
import AuditFilters from "../../components/audit/AuditFilters";
import AuditTable from "../../components/audit/AuditTable";
import StartAuditModal from "../../components/audit/StartAuditModal";

function Audit() {
  const [cycles, setCycles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchCycles = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/audits");
      if (response.success) {
        setCycles(response.data.items || response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch audit cycles", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await apiClient.get("/users");
      if (response.success) {
        setEmployees(response.data.items || response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchCycles();
    fetchEmployees();
  }, []);

  const handleStartAudit = async (data) => {
    try {
      const response = await apiClient.post("/audits", data);
      if (response.success) {
        setIsModalOpen(false);
        fetchCycles();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to start audit");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Audit Management
        </h1>
        <p className="mt-2 text-slate-500">
          Track and verify organizational assets through audit records.
        </p>
      </div>

      <AuditStats cycles={cycles} />

      <AuditFilters onStartClick={() => setIsModalOpen(true)} />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading audit cycles...</div>
      ) : (
        <AuditTable cycles={cycles} />
      )}
      
      <StartAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleStartAudit}
        employees={employees}
      />
    </div>
  );
}

export default Audit;