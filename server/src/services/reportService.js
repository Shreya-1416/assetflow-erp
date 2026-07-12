const assetRepository = require("../repositories/assetRepository");
const maintenanceRepository = require("../repositories/maintenanceRepository");
const allocationRepository = require("../repositories/allocationRepository");
const bookingRepository = require("../repositories/bookingRepository");

class ReportService {
  async getAssetUtilization() {
    // Basic implementation: most allocated/booked assets
    const assets = await assetRepository.findAll({ isDeleted: false });
    return {
      totalAssets: assets.length,
      activeAssets: assets.filter(a => a.status === "Allocated" || a.status === "Reserved").length,
      idleAssets: assets.filter(a => a.status === "Available").length
    };
  }
  
  async getMaintenanceFrequency() {
    const maintenanceRequests = await maintenanceRepository.findAll({});
    const frequencyByCategory = {};
    
    for (const req of maintenanceRequests) {
      if (req.asset && req.asset.category) {
        const catName = req.asset.category.name || String(req.asset.category);
        frequencyByCategory[catName] = (frequencyByCategory[catName] || 0) + 1;
      }
    }
    return frequencyByCategory;
  }
  
  async getDepartmentAllocationSummary() {
    const allocations = await allocationRepository.findAll({ status: "Active" });
    const deptSummary = {};
    
    for (const alloc of allocations) {
      if (alloc.allocatedToType === "Department" && alloc.allocatedToDepartment) {
        const deptId = alloc.allocatedToDepartment._id.toString();
        const deptName = alloc.allocatedToDepartment.name || deptId;
        deptSummary[deptName] = (deptSummary[deptName] || 0) + 1;
      }
    }
    return deptSummary;
  }
}

module.exports = new ReportService();
