const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 character!"],
      maxLength: [32, "Name cannot exceed 32 character!"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone: {
      type: Number,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
       
      },
      url: {
        type: String,
      
      },
    },
    education: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Reader", "Author"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 character!"],
     
      select: false,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  });

  const userModel=mongoose.model("Users",userSchema);

  module.exports=userModel;
  