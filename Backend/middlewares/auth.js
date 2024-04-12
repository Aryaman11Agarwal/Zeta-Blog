const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const userModel = require('../models/userModel.js');
const {ErrorHandler} = require('../middlewares/error.js');
const jwt = require("jsonwebtoken");

//AUTHENTICATION
const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }
  const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decoded.id);

  next();
});

//AUTHORIZATION
const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with this role(${req.user.role}) not allowed to access this resource`
        )
      );
    }
    next();
  };
}

module.exports={isAuthenticated,isAuthorized};