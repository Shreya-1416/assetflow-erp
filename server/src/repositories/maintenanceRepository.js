const MaintenanceRequest = require("../models/MaintenanceRequest");

class MaintenanceRepository {
  async create(data) {
    const request = new MaintenanceRequest(data);
    return await request.save();
  }

  async findById(id) {
    return await MaintenanceRequest.findById(id).populate("asset requestedBy assignedTechnician");
  }

  async update(id, updateData) {
    return await MaintenanceRequest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate("asset requestedBy assignedTechnician");
  }

  async findAll(query = {}) {
    return await MaintenanceRequest.find(query)
      .populate("asset requestedBy assignedTechnician")
      .sort({ createdAt: -1 });
  }
}

module.exports = new MaintenanceRepository();
