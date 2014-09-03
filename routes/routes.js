module.exports = function(app, passport) {
  // index
  app.get('/', function(req, res){
    res.render('index')
  });

  // auth
  var session = require('../controllers/session');
  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'delete_repo', 'read:org']}));
  app.get('/auth/github/callback', passport.authenticate('github',{successRedirect: '/#/account',failureRedirect: '/'})
  );
  app.get('/auth/session', isAuthenticated, session.session);
  app.del('/auth/logout', session.logout);

  /* api */

  // env

  // app.post('/env', isAuthenticated, function(r))

  // user
}


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({error: true, errorMessage: 'you are not authenticated'});
}