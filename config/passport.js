var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/user');

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
      process.nextTick(function() {
        User.findOne({'github.id' : profile.id}, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            user.token = token;
            user.name  = profile.displayName;
            user.email = profile.emails[0].value;
            user.save();
            return done(null, user);
          } else {
            var newUser = new User();
            newUser.github.id = profile.id,
            newUser.token     = token,
            newUser.name      = profile.displayName;
            newUser.email     = profile.emails[0].value;
            newUser.username  = profile.username;
            // save
            newUser.save(function(err){
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
      });
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