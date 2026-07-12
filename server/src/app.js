const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const departmentRoutes = require("./routes/departmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const assetRoutes = require("./routes/assetRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const auditRoutes = require("./routes/auditRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const logNotificationRoutes = require("./routes/logNotificationRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AssetFlow API is running"
  });
});

app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);
app.use("/categories", categoryRoutes);
app.use("/employees", employeeRoutes);
app.use("/assets", assetRoutes);
app.use("/allocations", allocationRoutes);
app.use("/bookings", bookingRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/audits", auditRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/reports", reportRoutes);
app.use("/system", logNotificationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

module.exports = app;
