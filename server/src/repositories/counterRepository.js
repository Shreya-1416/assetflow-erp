const Counter = require("../models/Counter");

const incrementSequence = ({ key, session }) => {
  return Counter.findOneAndUpdate(
    { key },
    { $inc: { sequence: 1 } },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      session
    }
  );
};

module.exports = {
  incrementSequence
};
