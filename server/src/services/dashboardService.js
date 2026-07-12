const assetRepository = require("../repositories/assetRepository");
const maintenanceRepository = require("../repositories/maintenanceRepository");
const bookingRepository = require("../repositories/bookingRepository");
const allocationRepository = require("../repositories/allocationRepository");
const transferRequestRepository = require("../repositories/transferRequestRepository");

class DashboardService {
  async getDashboardKPIs() {
    // 1. Assets Available
    const availableAssets = await assetRepository.findAll({ status: "Available", isDeleted: false });
    
    // 2. Assets Allocated
    const allocatedAssets = await assetRepository.findAll({ status: "Allocated", isDeleted: false });
    
    // 3. Maintenance Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const maintenanceToday = await maintenanceRepository.findAll({
      status: { $in: ["Pending", "Approved", "Technician Assigned", "In Progress"] },
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    // 4. Active Bookings
    const activeBookings = await bookingRepository.findAll({ status: "Ongoing" });
    
    // 5. Pending Transfers
    const pendingTransfers = await transferRequestRepository.findAll({ status: "Pending" });
    
    // 6. Upcoming Returns & Overdue Returns
    const activeAllocations = await allocationRepository.findAll({ status: "Active" });
    const upcomingReturns = [];
    const overdueReturns = [];
    
    const now = new Date();
    
    for (const alloc of activeAllocations) {
      if (alloc.expectedReturnDate) {
        if (new Date(alloc.expectedReturnDate) < now) {
          overdueReturns.push(alloc);
        } else {
          upcomingReturns.push(alloc);
        }
      }
    }
    
    return {
      assetsAvailableCount: availableAssets.length,
      assetsAllocatedCount: allocatedAssets.length,
      maintenanceTodayCount: maintenanceToday.length,
      activeBookingsCount: activeBookings.length,
      pendingTransfersCount: pendingTransfers.length,
      upcomingReturnsCount: upcomingReturns.length,
      overdueReturnsCount: overdueReturns.length,
      overdueReturnsList: overdueReturns
    };
  }
}

module.exports = new DashboardService();
