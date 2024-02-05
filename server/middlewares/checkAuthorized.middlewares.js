const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("Youdo not have permission to access this route", 403)
      );
    }
    next();
  };

module.exports = authorizedRoles;
