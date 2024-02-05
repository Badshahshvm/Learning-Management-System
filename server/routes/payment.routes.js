const express = require("express");
const {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getAllPayments,
} = require("../controllers/payment.js");
const isLoggedIn = require("../middlewares/auth.middlewares.js");
const authorizedRoles = require("../middlewares/checkAuthorized.middlewares.js");
const router = express.Router();

router.get("/razorpay-key", isLoggedIn, getRazorpayApiKey);
router.post("/suscribe", isLoggedIn, buySubscription);
router.post("/verify", isLoggedIn, verifySubscription);

router.post("/unsubscribe", isLoggedIn, cancelSubscription);
router.get("/", getAllPayments);
module.exports = router;
