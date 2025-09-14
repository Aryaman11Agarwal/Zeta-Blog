const catchAysncError = require("../middlewares/catchAsyncError.js");
const { ErrorHandler } = require("../middlewares/error.js");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary');

const register = catchAysncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type. Please provide your avatar in png, jpg or webp format.",
        400
      )
    );
  }
  const { name, email, phone, password, role, education } = req.body;
  if (!name || !email || !phone || !password || !role || !education) {
    return next(new ErrorHandler("Please fill full details", 400));
  }

  const user = await userModel.findOne({ email });

  if (user) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hpass = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    name,
    email,
    phone,
    password: hpass,
    role,
    education,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, (err, token) => {
    if (!err) {
      const options = {
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure:true,
        sameSite:"None"
        
      };

      res.status(200).cookie("token", token, options).send({
        success: true,
        newUser,
        message: "user logged in successfully",
        token: token,
      });
    } else {
      console.log("in error");
      return next(err);
    }
  });
});

const login = catchAysncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("please fill full details", 400));
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }

  jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, (err, token) => {
    if (!err) {
      const options = {
        maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        httpOnly: true,
         secure:true,
        sameSite:"None"
      };

      res.status(200).cookie("token", token, options).send({
        success: true,
        user,
        message: "user logged in successfully",
        token: token,
      });
    } else {
      console.log("in error");
      return next(err);
    }
  });
});

const logout = catchAysncError((req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
       secure:true,
        sameSite:"None"
    })
    .json({
      success: true,
      message: "User logged out!",
    });
});

const getMyProfile = catchAysncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

const getAllAuthors = catchAysncError(async (req, res, next) => {
  const authors = await userModel.find({ role: "Author" });
  res.status(200).json({
    success: true,
    authors,
  });
});

module.exports = { register, login, logout, getMyProfile, getAllAuthors };
