const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./database/dbConnection.js');
const {errorMiddleware} = require('./middlewares/error.js');
const userRouter = require('./Routes/userRouter.js');
const blogRouter = require('./Routes/blogRouter.js');
const fileUpload = require('express-fileupload');

dotenv.config({path:'./config/config.env'});


const app=express();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:['GET','PUT','POST','DELETE'],
    credentials:true
    }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);

dbConnection();

app.use(errorMiddleware);

module.exports=app;