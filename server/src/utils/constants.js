const USER_ROLES = ["Admin", "Asset Manager", "Department Head", "Employee"];
const PUBLIC_SIGNUP_ROLE = "Employee";
const USER_ROLE_RANK = {
  Employee: 1,
  "Department Head": 2,
  "Asset Manager": 3,
  Admin: 4
};
const ASSET_STATUSES = ["Available", "Allocated", "Reserved", "Maintenance", "Lost", "Retired", "Disposed"];
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
  SOFT_DELETED: "Soft Deleted"
};
const ASSET_HISTORY_ACTIONS = Object.values(ASSET_HISTORY_ACTION);
const ALLOCATION_STATUSES = ["Active", "Returned", "Transferred", "Cancelled"];
const TRANSFER_REQUEST_STATUSES = ["Pending", "Approved", "Rejected", "Cancelled"];
const NOTIFICATION_EVENT_TYPES = [
  "Asset Allocated",
  "Asset Returned",
  "Transfer Requested",
  "Transfer Approved",
  "Transfer Rejected"
];
const ACTIVITY_LOG_ACTIONS = [
  "Asset Allocation Created",
  "Asset Allocation Returned",
  "Asset Transfer Requested",
  "Asset Transfer Approved",
  "Asset Transfer Rejected"
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
  NOTIFICATION_EVENT_TYPES,
  ACTIVITY_LOG_ACTIONS
};
