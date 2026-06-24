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

    
    const user = await User.matchPassword(email,password);

    console.log('User:', user);

      // console.log(req.body);
      return res.redirect('/');

});

module.exports = router;