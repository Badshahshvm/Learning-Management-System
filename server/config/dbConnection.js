const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms")
    .then((conn) => {
      console.log("Connection successful...");
    })
    .catch((error) => console.log("Error:", error));
};

module.exports = connection;
