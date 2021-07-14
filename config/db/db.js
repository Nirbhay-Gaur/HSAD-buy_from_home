const mongoose = require("mongoose");

// DB Config
module.exports.connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://localhost/HSAD",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database is disconnected: " + error);
  }
};
