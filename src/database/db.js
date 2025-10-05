const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch(error => {
      console.error("MongoDB connection error:", error.message);
      process.exit(1); // Exit if DB connection fails
    });
}

module.exports = connectToDb;
