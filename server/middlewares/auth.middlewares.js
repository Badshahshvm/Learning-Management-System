const AppError = require("../utils/error.utils");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthorized, please try again", 400));
  }

  const userDetails = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;
  next();
};

module.exports = isLoggedIn;
