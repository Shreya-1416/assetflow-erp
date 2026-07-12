const AuditCycle = require("../models/AuditCycle");
const AuditItem = require("../models/AuditItem");

class AuditRepository {
  async createCycle(data) {
    const cycle = new AuditCycle(data);
    return await cycle.save();
  }

  async getCycleById(id) {
    return await AuditCycle.findById(id).populate("assignedAuditors createdBy scope.department");
  }

  async updateCycle(id, updateData) {
    return await AuditCycle.findByIdAndUpdate(id, updateData, {
      new: true
    }).populate("assignedAuditors createdBy scope.department");
  }

  async getCycles(query = {}) {
    return await AuditCycle.find(query)
      .populate("assignedAuditors createdBy scope.department")
      .sort({ createdAt: -1 });
  }

  async createItems(itemsData) {
    return await AuditItem.insertMany(itemsData);
  }

  async getItemsByCycle(cycleId) {
    return await AuditItem.find({ auditCycle: cycleId }).populate("asset auditedBy");
  }
  
  async getDiscrepancies(cycleId) {
    return await AuditItem.find({ 
      auditCycle: cycleId, 
      status: { $in: ["Missing", "Damaged"] }
    }).populate("asset auditedBy");
  }

  async updateItem(itemId, updateData) {
    return await AuditItem.findByIdAndUpdate(itemId, updateData, { new: true }).populate("asset auditedBy");
  }
}

module.exports = new AuditRepository();
