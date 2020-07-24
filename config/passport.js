const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// Load User Model

const User = mongoose.model('users');

module.exports = (passport)=>{
    passport.use(new LocalStrategy({usernameField: 'username'},(username, password, done)=>{
        User.findOne({username: username}).then(user=>{

            if(!user){
                return done(null, false, {message: 'User Not Found'});
            }
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) throw err;
                
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false, {message: 'Password Incorrect'});
                }
            });
        });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}

