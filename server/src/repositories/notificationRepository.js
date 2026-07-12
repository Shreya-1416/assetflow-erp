const NotificationEvent = require("../models/NotificationEvent");

const create = async ({ payload, session }) => {
  if (session) {
    const events = await NotificationEvent.create([payload], { session });
    return events[0];
  }

  return NotificationEvent.create(payload);
};

module.exports = {
  create
};
