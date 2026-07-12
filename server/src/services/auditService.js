const auditRepository = require("../repositories/auditRepository");
const assetRepository = require("../repositories/assetRepository");
const ApiError = require("../utils/ApiError");

class AuditService {
  async createAuditCycle(userId, cycleData) {
    const { name, scope, startDate, endDate, assignedAuditors } = cycleData;
    
    // Create the cycle
    const cycle = await auditRepository.createCycle({
      name,
      scope,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      assignedAuditors,
      createdBy: userId,
      status: "Open"
    });
    
    // Fetch assets based on scope (department or location)
    const assetQuery = { isDeleted: false };
    if (scope && scope.department) {
      assetQuery.department = scope.department;
    }
    if (scope && scope.location) {
      assetQuery.location = scope.location;
    }
    
    // Filter out disposed/retired perhaps, but let's just get all that match query
    const assetsToAudit = await assetRepository.findAll(assetQuery);
    
    // Create audit items
    const auditItems = assetsToAudit.map(asset => ({
      auditCycle: cycle._id,
      asset: asset._id,
      status: "Pending"
    }));
    
    if (auditItems.length > 0) {
      await auditRepository.createItems(auditItems);
    }
    
    return cycle;
  }

  async getCycles(query) {
    return await auditRepository.getCycles(query);
  }
  
  async getCycleDetails(cycleId) {
    const cycle = await auditRepository.getCycleById(cycleId);
    if (!cycle) {
      throw new ApiError(404, "Audit cycle not found");
    }
    const items = await auditRepository.getItemsByCycle(cycleId);
    return { cycle, items };
  }

  async verifyItem(cycleId, itemId, userId, itemData) {
    const { status, notes } = itemData;
    const item = await auditRepository.updateItem(itemId, {
      status,
      notes,
      auditedBy: userId,
      auditedAt: new Date()
    });
    if (!item) {
      throw new ApiError(404, "Audit item not found");
    }
    return item;
  }

  async closeCycle(cycleId, userId) {
    const cycle = await auditRepository.getCycleById(cycleId);
    if (!cycle) {
      throw new ApiError(404, "Audit cycle not found");
    }
    if (cycle.status === "Closed") {
      throw new ApiError(400, "Audit cycle is already closed");
    }
    
    // Find missing items and update asset statuses
    const discrepancies = await auditRepository.getDiscrepancies(cycleId);
    for (const item of discrepancies) {
      if (item.status === "Missing") {
        await assetRepository.update(item.asset._id, { status: "Lost" }, userId);
      } else if (item.status === "Damaged") {
        await assetRepository.update(item.asset._id, { condition: "Damaged" }, userId);
      }
    }
    
    const closedCycle = await auditRepository.updateCycle(cycleId, { status: "Closed" });
    return closedCycle;
  }
  
  async generateDiscrepancyReport(cycleId) {
    const discrepancies = await auditRepository.getDiscrepancies(cycleId);
    return discrepancies;
  }
}

module.exports = new AuditService();
