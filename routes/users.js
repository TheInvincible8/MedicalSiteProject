const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {auth} = require('../config/auth');

// Loading Model
require('../models/User');
const User = mongoose.model('users');
require('../config/passport')(passport);

router.get('/register',(req,res)=>{
    res.render('register');
});


router.post('/register', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let pincode = req.body.pincode;

    let errors = [];


    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            errors.push({
                text: 'Username Already exists'
            });
        }

        function hasWhiteSpace(s) {
            return s.indexOf(' ') >= 0;
        }
        if (!username) {
            errors.push({
                text: 'Username field must be filled & spaces not allowed'
            });
        }
        if (!email) {
            errors.push({
                text: 'Email field must be filled'
            });
        }
        if (!password) {
            errors.push({
                text: 'Password field must be filled'
            });
        }
        if (!password2) {
            errors.push({
                text: 'Enter Confirm Password field'
            });
        }
        if (username.length < 4) {
            errors.push({
                text: 'Username must be 4 characters long'
            });
        }
        if (hasWhiteSpace(username)) {
            errors.push({
                text: 'Username must not contains any spaces'
            });
        }
        if (password.length < 6) {
            errors.push({
                text: 'Password must be 6 characters long'
            });
        }
        if (password != password2) {
            errors.push({
                text: 'Password & Confirm Password must be matches'
            });
        }
        if (errors.length > 0) {
            res.render('register', {
                errors
            })
        } else {

            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(password,salt,(err, hash)=>{
                    password = hash;
                    let newUser = {
                        username,
                        email,
                        password,
                        password2,
                        state,
                        city,
                        address,
                        pincode,
                    }
                    User(newUser).save().then(user=>{
                        req.flash('success_msg','Registration Successfull');
                        res.redirect('/users/login');
                    });
                });
            });
        }
    });
});




router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out now');
    res.redirect('/');
});



router.get('/profile',auth,(req,res)=>{
    let userid = req.user._id || null;
    User.findById(userid).then(user=>{
        res.render('profile',{
            user: user
        })
    })
   
});




module.exports = router;