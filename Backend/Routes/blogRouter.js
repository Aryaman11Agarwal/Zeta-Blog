const express = require('express');
const {isAuthenticated,isAuthorized} = require('../middlewares/auth');
const {blogPost} = require('../controllers/blogController');

const router=express.Router();

router.post('/post',isAuthenticated,isAuthorized("Author"),blogPost);

module.exports=router