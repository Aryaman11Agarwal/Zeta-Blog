const express = require('express');
const {register,login,logout} = require('../controllers/userController.js');
const {isAuthenticated} =require('../middlewares/auth.js')


const router=express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthenticated,logout);


module.exports=router;