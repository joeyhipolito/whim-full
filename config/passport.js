var GithubStrategy = require('passport-github').Strategy;
// var User = require('../models/user');

// auth config
var configAuth = require('./auth');

module.exports = function(passport) {
  passport.use(new GithubStrategy(
    {
      clientID     : configAuth.githubAuth.clientID,
      clientSecret : configAuth.githubAuth.clientSecret,
      callbackURL  : configAuth.githubAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
      
    }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });
}