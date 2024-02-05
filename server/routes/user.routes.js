const express = require("express");
const router = express.Router();

const {
  changePassword,
  forgotPassword,
  getLoggedInUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} = require("../controllers/user");
const isLoggedIn = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/multer.middlewares");
router.get("/hey", (req, res) => {
  res.send("< h1>shiva</h1>");
});

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", isLoggedIn, getLoggedInUserDetails);
router.post("/forgot/password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);
module.exports = router;
