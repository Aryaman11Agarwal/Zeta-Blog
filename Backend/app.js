const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./database/dbConnection.js');
const {errorMiddleware} = require('./middlewares/error.js');
const userRouter = require('./Routes/userRouter.js');
const fileUpload = require('express-fileupload');

dotenv.config({path:'./config/config.env'});


const app=express();

app.use(cors({
    origin:[],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/user",userRouter);

dbConnection();

app.use(errorMiddleware);

module.exports=app;