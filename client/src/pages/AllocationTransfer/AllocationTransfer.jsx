import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import AllocationStats from "../../components/allocation/AllocationStats";
import AllocationFilters from "../../components/allocation/AllocationFilters";
import AllocationTable from "../../components/allocation/AllocationTable";
import AllocateAssetModal from "../../components/allocation/AllocateAssetModal";
import { FiTool } from "react-icons/fi";

function AllocationTransfer() {
  const [allocations, setAllocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllocations = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/allocations");
      if (response.success) {
        setAllocations(response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch allocations", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Allocation & Transfer
        </h1>

        <p className="text-slate-500 mt-2">
          Allocate and transfer organizational assets.
        </p>
      </div>

      <AllocationStats allocations={allocations} />

      <AllocationFilters onAllocateClick={() => setIsModalOpen(true)} />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading allocations...</div>
      ) : (
        <AllocationTable allocations={allocations} />
      )}

      <AllocateAssetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchAllocations();
        }}
      />
    </div>
  );
}

export default AllocationTransfer;