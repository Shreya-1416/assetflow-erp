const maintenanceRepository = require("../repositories/maintenanceRepository");
const assetRepository = require("../repositories/assetRepository");
const ApiError = require("../utils/ApiError");

class MaintenanceService {
  async createRequest(userId, requestData) {
    const { asset, issueDescription, priority, photoUrl } = requestData;
    
    // Check if asset exists
    const assetDoc = await assetRepository.findById(asset);
    if (!assetDoc) {
      throw new ApiError(404, "Asset not found");
    }
    
    const request = await maintenanceRepository.create({
      asset,
      requestedBy: userId,
      issueDescription,
      priority,
      photoUrl,
      status: "Pending"
    });
    
    return request;
  }

  async getRequests(query) {
    return await maintenanceRepository.findAll(query);
  }

  async getRequestById(id) {
    const request = await maintenanceRepository.findById(id);
    if (!request) {
      throw new ApiError(404, "Maintenance request not found");
    }
    return request;
  }

  async updateRequestStatus(id, updateData, userId) {
    const request = await maintenanceRepository.findById(id);
    if (!request) {
      throw new ApiError(404, "Maintenance request not found");
    }
    
    const { status, assignedTechnician, resolutionNotes } = updateData;
    
    const updatedRequest = await maintenanceRepository.update(id, {
      ...(status && { status }),
      ...(assignedTechnician && { assignedTechnician }),
      ...(resolutionNotes && { resolutionNotes })
    });
    
    // Handle asset status updates based on maintenance status
    if (status === "Approved") {
      await assetRepository.update(request.asset._id, { status: "Under Maintenance" }, userId);
    } else if (status === "Resolved") {
      await assetRepository.update(request.asset._id, { status: "Available" }, userId); // Or return to allocated? usually to Available.
    }
    
    return updatedRequest;
  }
}

module.exports = new MaintenanceService();
