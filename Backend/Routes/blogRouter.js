const express = require('express');
const {isAuthenticated,isAuthorized} = require('../middlewares/auth');
const {blogPost,deletePost,getAllBlogs} = require('../controllers/blogController');

const router=express.Router();

router.post('/post',isAuthenticated,isAuthorized("Author"),blogPost);
router.delete('/delete/:id',isAuthenticated,isAuthorized("Author"),deletePost)
router.get('/all',getAllBlogs)

module.exports=router