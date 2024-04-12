const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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

module.exports=app;