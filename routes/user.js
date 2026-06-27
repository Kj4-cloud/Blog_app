const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/signin' , (req, res) => {
  res.render('signin');
})

router.get('/signup' , (req, res) => {
  res.render('signup');
})

router.post('/signup' , async (req, res) => { 
  const {fullName,email,password} = req.body;

  // console.log(req.body);

  await User.create({fullName,email,password});
  return res.redirect('/user/signin');

});

router.post('/signin' , async (req, res) => {
     const {email,password} = req.body;

     try{    
      const token = await User.matchPasswordAndGenrateToken(email,password);
      return res.cookie("token", token).redirect('/');
      }
      
      catch(error){
        return res.render('signin', {error:"Invalid email or password"});
      }

});

router.get('/logout' , (req , res) => {
  return res.clearCookie('token').redirect('/');
});

module.exports = router;