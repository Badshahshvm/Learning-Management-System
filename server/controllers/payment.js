const Payment = require("../models/payment.model");
const userModel = require("../models/user.model");
const razorPay = require("../server");
const AppError = require("../utils/error.utils");
const crypto = require("crypto");

const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razarpay API key",
      key: process.env.RAZORPAY_KEY_ID,
    });
    console.log(process.env.RAZORPAY_KEY_ID);
  } catch (error) {
    return next(new AppError(error), 500);
  }
};

const buySubscription = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(new AppError("Unauthorized, please login", 500));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    const subscription = await razorPay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID || "plan_NUWqnXN03aAVri",
      customer_notify: 1,
      total_count: 12, // 12 means it will charge every month for a 1-year sub.
    });

    user.subscription.id = subscription.id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
};

const verifySubscription = async (req, res, next) => {
  const { id } = req.user;
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  // Finding the user
  const user = await userModel.findById(id);
  if (!user) {
    return next(new AppError("Unauthorized, please try again", 500));
  }

  // Getting the subscription ID from the user object
  const subscriptionId = user.subscription.id;

  // Generating a signature with SHA256 for verification purposes
  // Here the subscriptionId should be the one which we saved in the DB
  // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
  // At the end convert it to Hex value
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return next(new AppError("Payment not verified, please try again", 500));
  }

  await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";
  await user.save();
  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
};

const cancelSubscription = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    const subscriptionId = user.subscription.id;
    const subscription = await razorPay.subscriptions.cancel(subscriptionId);

    user.subscription.status = subscription.status;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

const getAllPayments = async (req, res, next) => {
  const { count, skip } = req.query;

  if (!razorPay.subscriptions) {
    return next(new AppError("Razorpay subscriptions not defined", 400));
  }

  try {
    // Find all subscriptions from razorpay
    const allPayments = await razorPay.subscriptions.all({
      count: count || 10,
      skip: skip || 0,
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = monthNames.reduce((obj, month) => {
      obj[month] = 0;
      return obj;
    }, {});

    const monthlyWisePayments = allPayments.items.map((payment) => {
      const monthsInNumbers = new Date(payment.start_at * 1000);
      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.forEach((month) => {
      finalMonths[month] += 1;
    });

    const monthlySalesRecord = Object.values(finalMonths);

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

module.exports = {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getAllPayments,
};
