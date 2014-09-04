module.exports = function(app, passport) {
  // index
  app.get('/', function(req, res){
    res.render('index')
  });

  // api
  

  // auth
  var session = require('../controllers/session');
  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'delete_repo', 'read:org']}));
  app.get('/auth/github/callback', passport.authenticate('github',{successRedirect: '/#/account',failureRedirect: '/'})
  );
  app.get('/auth/session', isAuthenticated, session.session);
  app.delete('/auth/logout', session.logout);

  /* api */
  app.get('/secured', isAuthenticated, function (req, res) {
    res.json({'authenticated' : true});
  });
  // env

  // app.post('/env', isAuthenticated, function(r))

  // user
  var user = require('../controllers/user');
  app.get('/user', isAuthenticated, user.read);
  app.get('/user/orgs', isAuthenticated, user.orgs);

  // repos
  var repo = require('../controllers/repo');
  app.get('/repo/:login', isAuthenticated, repo.read);

  // index
  app.get('/*', function(req, res){
    // session start lol
    if(req.user) {
      var user = {
        "id": req.user._id,
        "username": req.user.username,
        "name": req.user.name,
        "email": req.user.email
      };
      res.cookie('user', JSON.stringify(user));
    };

    res.render('index');
  });

}


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.json({error: true, errorMessage: 'you are not authenticated'});
}
