const express = require('express');
const {isAuthenticated,isAuthorized} = require('../middlewares/auth');
const {blogPost,deletePost,getAllBlogs,getSingleBlog,getMyBlogs,updateBlog} = require('../controllers/blogController');

const router=express.Router();

router.post('/post',isAuthenticated,isAuthorized("Author"),blogPost);
router.delete('/delete/:id',isAuthenticated,isAuthorized("Author"),deletePost)
router.get('/all',getAllBlogs)
router.get('/singleblog/:id',isAuthenticated,getSingleBlog)
router.get('/myBlogs',isAuthenticated,isAuthorized("Author"),getMyBlogs)
router.put('/update/:id',isAuthenticated,isAuthorized("Author"),updateBlog)

module.exports=router