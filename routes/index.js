const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// ============
// Auth Routes
// ============

router.get('/', (req, res) => {
  res.render('campgrounds/landing');
});

router.get('/register', (req, res) => {
  res.render('register', {page: 'register'});
});

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username});
  
  User.register(newUser, req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register', {error: err.message});
    }
    
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Welcome to YelpCamp ${user.username}`);
      res.redirect('/campgrounds');
    });
  });
});

// ============
// login Routes
// ============
    
router.get('/login', (req, res) => {
  res.render("login", {page: 'login'}); 
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds', 
    failureRedirect: '/login',
  }), (req, res) => {
  
});
  
// =============
// logout Routes
// ============= 

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out');
  res.redirect('/campgrounds');
});



module.exports = router;