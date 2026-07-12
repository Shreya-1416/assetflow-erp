const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  // Override startSession to bypass transactions on standalone MongoDB instances
  const originalStartSession = mongoose.startSession.bind(mongoose);
  mongoose.startSession = async function (opts) {
    const session = await originalStartSession(opts);
    
    // Mock withTransaction to just run the callback
    session.withTransaction = async function (callback) {
      return await callback(session);
    };
    
    return session;
  };

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;
