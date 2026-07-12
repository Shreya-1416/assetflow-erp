import { useState } from "react";

import AssetStats from "../../components/assets/AssetStats";
import AssetFilters from "../../components/assets/AssetFilters";
import AssetTable from "../../components/assets/AssetTable";
import AssetDetailsDrawer from "../../components/assets/AssetDetailsDrawer";

function Assets() {
  const [selectedAsset, setSelectedAsset] = useState(null);

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

      <AssetStats />

      <AssetFilters />

      <AssetTable
        onView={(asset) => setSelectedAsset(asset)}
      />

      <AssetDetailsDrawer
        asset={selectedAsset}
        isOpen={selectedAsset !== null}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}

export default Assets;