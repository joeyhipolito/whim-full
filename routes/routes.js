module.exports = function(app, passport) {
  // index
  app.get('/', function(req, res){
    res.render('index')
  });

  // auth
  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'delete_repo', 'read:org']}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      'successRedirect': '/#/account',
      'failureRedirect': '/'
    })
  );

  app.get('/logout', function(req,res,next){
    req.logout();
    res.json({
      'loggedOut' : true
    });
  });

  /* api */

  // env

  // app.post('/env', isAuthenticated, function(r))

  // user
}


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({error: 1, errorMessage: 'you are not authenticated'});
}