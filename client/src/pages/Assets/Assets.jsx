import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

import AssetStats from "../../components/assets/AssetStats";
import AssetFilters from "../../components/assets/AssetFilters";
import AssetTable from "../../components/assets/AssetTable";
import AssetDetailsDrawer from "../../components/assets/AssetDetailsDrawer";
import AddAssetModal from "../../components/assets/AddAssetModal";

function Assets() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/assets");
      if (response.success) {
        setAssets(response.data.assets || response.data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch assets", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOptions = async () => {
    try {
      const [catRes, deptRes] = await Promise.all([
        apiClient.get("/categories"),
        apiClient.get("/departments")
      ]);
      if (catRes.success) setCategories(catRes.data.items || catRes.data || []);
      if (deptRes.success) setDepartments(deptRes.data.items || deptRes.data || []);
    } catch (err) {
      console.error("Failed to fetch options for adding asset", err);
    }
  };

  useEffect(() => {
    fetchAssets();
    fetchOptions();
  }, []);

  const handleAddAsset = async (data) => {
    try {
      const response = await apiClient.post("/assets", data);
      if (response.success) {
        setIsAddModalOpen(false);
        fetchAssets();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add asset");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Asset Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage, track, and monitor organizational assets.
        </p>
      </div>

      <AssetStats assets={assets} />

      <AssetFilters onAddClick={() => setIsAddModalOpen(true)} />

      {isLoading ? (
        <div className="py-8 text-center text-slate-500">Loading assets...</div>
      ) : (
        <AssetTable
          assets={assets}
          onView={(asset) => setSelectedAsset(asset)}
        />
      )}

      <AssetDetailsDrawer
        asset={selectedAsset}
        isOpen={selectedAsset !== null}
        onClose={() => setSelectedAsset(null)}
      />
      
      <AddAssetModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAsset}
        categories={categories}
        departments={departments}
      />
    </div>
  );
}

export default Assets;