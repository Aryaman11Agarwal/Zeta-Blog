const catchAysncError =require("../middlewares/catchAsyncError.js");
const {ErrorHandler} =require("../middlewares/error.js")
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel.js');

const register=catchAysncError(async (req,res,next)=>{
    const {name,email,phone,password,role,education}=req.body;
    if(!name||!email||!phone||!password||!role||!education){
        return next(new ErrorHandler("Please fill full details",400));
    }

    const user=await userModel.findOne({email});

    if(user){
        return next(new ErrorHandler("Email already exists",400)) ;
    }
    const salt=await bcrypt.genSalt(10); 
    const hpass=await bcrypt.hash(password,salt);
    const newUser=await userModel.create({name,email,phone,password:hpass,role,education});

    res.status(200).json({
        success:true,
        message:"User created"
    })

     
})

const login=catchAysncError(async (req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email||!password||!role){
        return next("Please fill full details");
    }
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    const isMatched=await bcrypt.compare(password,user.password);

    if(!isMatched){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    if(user.role!==role){
        return next(new ErrorHandler("User with this role not found",400));
    }

    res.status(200).json({
        success:true,
        message:"User logged In"
    })

})

module.exports={register,login};