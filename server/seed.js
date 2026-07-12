const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./src/config/db");

const User = require("./src/models/User");
const Department = require("./src/models/Department");
const Category = require("./src/models/Category");
const Asset = require("./src/models/Asset");
const AssetAllocation = require("./src/models/AssetAllocation");
const MaintenanceRequest = require("./src/models/MaintenanceRequest");
const ResourceBooking = require("./src/models/ResourceBooking");
const AuditCycle = require("./src/models/AuditCycle");
const NotificationEvent = require("./src/models/NotificationEvent");

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to DB, clearing old data...");

    // Only clear non-Admin users to avoid deleting the admin we just created
    await User.deleteMany({ role: { $ne: "Admin" } });
    await Department.deleteMany({});
    await Category.deleteMany({});
    await Asset.deleteMany({});
    await AssetAllocation.deleteMany({});
    await MaintenanceRequest.deleteMany({});
    await ResourceBooking.deleteMany({});
    await AuditCycle.deleteMany({});
    await NotificationEvent.deleteMany({});

    console.log("Seeding new data...");

    // Departments
    const dept1 = await Department.create({ name: "Engineering", description: "Tech team", isActive: true });
    const dept2 = await Department.create({ name: "Human Resources", description: "HR team", isActive: true });
    const dept3 = await Department.create({ name: "Finance", description: "Finance team", isActive: true });

    // Categories
    const cat1 = await Category.create({ name: "Laptops", description: "Work laptops", isActive: true });
    const cat2 = await Category.create({ name: "Monitors", description: "External displays", isActive: true });
    const cat3 = await Category.create({ name: "Peripherals", description: "Keyboards, mice", isActive: true });
    const cat4 = await Category.create({ name: "Meeting Room Equipment", description: "Projectors, etc.", isActive: true });

    // Find the admin user
    const adminUser = await User.findOne({ role: "Admin" });

    // Users (Employees)
    const hash = await bcrypt.hash("password123", 10);
    const emp1 = await User.create({ name: "John Doe", email: "john@assetflow.com", password: hash, role: "Employee", department: dept1._id, isActive: true });
    const emp2 = await User.create({ name: "Jane Smith", email: "jane@assetflow.com", password: hash, role: "Employee", department: dept2._id, isActive: true });
    const mgr1 = await User.create({ name: "Bob Boss", email: "bob@assetflow.com", password: hash, role: "Department Head", department: dept1._id, isActive: true });
    const tech1 = await User.create({ name: "Tim Fixer", email: "tim@assetflow.com", password: hash, role: "Employee", isActive: true });

    // Assets
    const dummyQr = { value: "dummy-qr", dataUrl: "data:image/png;base64,dummy" };
    const asset1 = await Asset.create({ assetTag: "AST-1001", name: "MacBook Pro 16", serialNumber: "C02XYZ", category: cat1._id, department: dept1._id, status: "Allocated", condition: "Good", purchaseDate: new Date(), cost: 2500, location: "New York HQ", qrCode: dummyQr });
    const asset2 = await Asset.create({ assetTag: "AST-1002", name: "Dell UltraSharp 27", serialNumber: "DELL456", category: cat2._id, department: dept1._id, status: "Available", condition: "Excellent", purchaseDate: new Date(), cost: 400, location: "New York HQ", qrCode: dummyQr });
    const asset3 = await Asset.create({ assetTag: "AST-1003", name: "Sony Projector", serialNumber: "SNY789", category: cat4._id, department: dept3._id, status: "Available", condition: "Good", purchaseDate: new Date(), cost: 1200, location: "Conference Room A", qrCode: dummyQr });
    const asset4 = await Asset.create({ assetTag: "AST-1004", name: "ThinkPad T14", serialNumber: "LEN123", category: cat1._id, department: dept2._id, status: "Maintenance", condition: "Fair", purchaseDate: new Date(), cost: 1500, location: "London Office", qrCode: dummyQr });

    // Allocations
    await AssetAllocation.create({ asset: asset1._id, allocatedTo: emp1._id, allocatedBy: adminUser._id, allocationDate: new Date(), expectedReturnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: "Active", conditionAtAllocation: "Good", history: [{ action: "Allocated", performedBy: adminUser._id, message: "Initial allocation" }] });

    // Maintenance
    await MaintenanceRequest.create({ asset: asset4._id, requestedBy: emp2._id, priority: "High", issueDescription: "Screen flickering", status: "Technician Assigned", assignedTechnician: tech1._id });

    // Bookings
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    await ResourceBooking.create({ resource: asset3._id, bookedBy: emp1._id, startTime: today, endTime: tomorrow, purpose: "Client presentation", status: "Upcoming" });

    // Audit Cycle
    await AuditCycle.create({ name: "Q3 2026 Asset Audit", startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), status: "Open", createdBy: adminUser._id, assignedAuditors: [adminUser._id] });

    // Notifications
    await NotificationEvent.create({ user: adminUser._id, title: "Maintenance Alert", message: "ThinkPad T14 requires maintenance", type: "Maintenance Approved" });
    await NotificationEvent.create({ user: adminUser._id, title: "Booking Received", message: "John booked Sony Projector", type: "Booking Confirmed" });
    await NotificationEvent.create({ user: adminUser._id, title: "Allocation Success", message: "MacBook Pro allocated to John", type: "Asset Allocated" });

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
