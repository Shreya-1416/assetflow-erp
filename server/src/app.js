const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const departmentRoutes = require("./routes/departmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AssetFlow API is running"
  });
});

app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);
app.use("/categories", categoryRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

module.exports = app;
