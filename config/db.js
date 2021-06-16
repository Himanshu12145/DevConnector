const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("MongoDb connected...");
  } catch (error) {
    console.error(error.message);
    // ! Exit the process with failure --> (exiting the application process if there is DB error)
    process.exit(1);
  }
};

module.exports = connectDB;
