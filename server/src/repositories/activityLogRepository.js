const ActivityLog = require("../models/ActivityLog");

const create = async ({ payload, session }) => {
  if (session) {
    const logs = await ActivityLog.create([payload], { session });
    return logs[0];
  }

  return ActivityLog.create(payload);
};

module.exports = {
  create
};
