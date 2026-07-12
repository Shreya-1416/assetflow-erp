import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import MaintenanceStats from "../../components/maintenance/MaintenanceStats";
import MaintenanceFilters from "../../components/maintenance/MaintenanceFilters";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import MaintenanceModal from "../../components/maintenance/MaintenanceModal";

function Maintenance() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableAssets, setAvailableAssets] = useState([]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/maintenance");
      if (response.success) {
        setRequests(response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch maintenance requests", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await apiClient.get("/assets");
      if (response.success) {
        setAvailableAssets(response.data.items || response.data.assets || []);
      }
    } catch (err) {
      console.error("Failed to fetch assets", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchAssets();
  }, []);

  const handleRaiseRequest = async (data) => {
    try {
      const response = await apiClient.post("/maintenance", data);
      if (response.success) {
        setIsModalOpen(false);
        fetchRequests();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Maintenance & Repairs
        </h1>

        <p className="mt-2 text-slate-500">
          Track and manage asset maintenance requests and schedules.
        </p>
      </div>

      <MaintenanceStats requests={requests} />

      <MaintenanceFilters onRaiseClick={() => setIsModalOpen(true)} />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading requests...</div>
      ) : (
        <MaintenanceTable
          requests={requests}
          onView={(request) => setSelectedRequest(request)}
        />
      )}
      
      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleRaiseRequest}
        assets={availableAssets}
      />
    </div>
  );
}

export default Maintenance;