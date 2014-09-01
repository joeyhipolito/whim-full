module.exports = function(app, passport) {
  // index
  app.get('/', function(req, res){
    res.render('index')
  });

  // api

  // auth
  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'delete_repo', 'read:org']}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/'
    })
  );
}


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({error: 1, errorMessage: 'you are not authenticated'});
}