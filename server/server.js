const { config } = require("dotenv");
const app = require("./app");
const connection = require("./config/dbConnection");
// Import the Cloudinary module
const cloudinary = require("cloudinary").v2;
const Razorpay = require("razorpay");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "djf6iqewn",
  api_key: "875196813914863",
  api_secret: "GWUeTZWP8uIuNHIon8IYyZNH3EM",
});

const razorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_DMJGTQkpAYimbx",
  key_secret: process.env.RAZORPAY_SECRET,
});

// Load environment variables from a .env file
config();

app.listen(process.env.PORT, async () => {
  await connection();
  console.log("Server is up and running on port", process.env.PORT);
});

module.exports = razorPay;
