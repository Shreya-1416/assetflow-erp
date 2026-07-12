const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../utils/asyncHandler");

const getKPIs = asyncHandler(async (req, res) => {
  const kpis = await dashboardService.getDashboardKPIs();
  res.status(200).json({
    success: true,
    data: kpis
  });
});

module.exports = {
  getKPIs
};
