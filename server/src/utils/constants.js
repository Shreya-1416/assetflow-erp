const USER_ROLES = ["Admin", "Asset Manager", "Department Head", "Employee"];
const PUBLIC_SIGNUP_ROLE = "Employee";
const USER_ROLE_RANK = {
  Employee: 1,
  "Department Head": 2,
  "Asset Manager": 3,
  Admin: 4
};
const ASSET_STATUSES = ["Available", "Allocated", "Reserved", "Maintenance", "Lost", "Retired", "Disposed", "Under Maintenance"];
const ASSET_CONDITIONS = ["New", "Excellent", "Good", "Fair", "Poor", "Damaged"];
const ASSET_HISTORY_ACTION = {
  CREATED: "Created",
  UPDATED: "Updated",
  STATUS_CHANGED: "Status Changed",
  ALLOCATED: "Allocated",
  TRANSFER_REQUESTED: "Transfer Requested",
  TRANSFER_APPROVED: "Transfer Approved",
  TRANSFER_REJECTED: "Transfer Rejected",
  RETURNED: "Returned",
  SOFT_DELETED: "Soft Deleted",
  MAINTENANCE_REQUESTED: "Maintenance Requested",
  MAINTENANCE_COMPLETED: "Maintenance Completed",
  AUDIT_UPDATED: "Audit Updated"
};
const ASSET_HISTORY_ACTIONS = Object.values(ASSET_HISTORY_ACTION);
const ALLOCATION_STATUSES = ["Active", "Returned", "Transferred", "Cancelled"];
const TRANSFER_REQUEST_STATUSES = ["Pending", "Approved", "Rejected", "Cancelled"];
const BOOKING_STATUSES = ["Upcoming", "Ongoing", "Completed", "Cancelled"];
const MAINTENANCE_STATUSES = ["Pending", "Approved", "Rejected", "Technician Assigned", "In Progress", "Resolved"];
const AUDIT_CYCLE_STATUSES = ["Open", "Closed"];
const AUDIT_ITEM_STATUSES = ["Pending", "Verified", "Missing", "Damaged"];
const NOTIFICATION_EVENT_TYPES = [
  "Asset Allocated",
  "Asset Returned",
  "Transfer Requested",
  "Transfer Approved",
  "Transfer Rejected",
  "Booking Confirmed",
  "Booking Cancelled",
  "Booking Reminder",
  "Maintenance Approved",
  "Maintenance Rejected",
  "Overdue Return Alert",
  "Audit Discrepancy Flagged"
];
const ACTIVITY_LOG_ACTIONS = [
  "Asset Allocation Created",
  "Asset Allocation Returned",
  "Asset Transfer Requested",
  "Asset Transfer Approved",
  "Asset Transfer Rejected",
  "Resource Booked",
  "Booking Cancelled",
  "Maintenance Raised",
  "Maintenance Status Updated",
  "Audit Cycle Created",
  "Audit Cycle Closed"
];

module.exports = {
  USER_ROLES,
  PUBLIC_SIGNUP_ROLE,
  USER_ROLE_RANK,
  ASSET_STATUSES,
  ASSET_CONDITIONS,
  ASSET_HISTORY_ACTION,
  ASSET_HISTORY_ACTIONS,
  ALLOCATION_STATUSES,
  TRANSFER_REQUEST_STATUSES,
  BOOKING_STATUSES,
  MAINTENANCE_STATUSES,
  AUDIT_CYCLE_STATUSES,
  AUDIT_ITEM_STATUSES,
  NOTIFICATION_EVENT_TYPES,
  ACTIVITY_LOG_ACTIONS
};
