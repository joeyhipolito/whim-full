module.exports = function(app, passport) {
  
  /* index */

  app.get('/', function(req, res){
    res.render('index')
  });

  /* authentication */
  var session = require('../controllers/session');
  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'read:org']}));
  app.get('/auth/github/callback', passport.authenticate('github',{successRedirect: '/#/account',failureRedirect: '/'})
  );
  app.get('/auth/session', isAuthenticated, session.session);
  app.delete('/auth/session', session.logout);

  /* api */
  var container = require('../controllers/container');
  app.get('/container', isAuthenticated, container.query);
  // app.post('/container', isAuthenticated, container.create);
  app.put('/container/:id', container.run);
  app.get('/container/:id', container.read);
  
  var repo = require('../controllers/repo');
  app.post('/repo', isAuthenticated, repo.clone);

  // user
  var user = require('../controllers/user');
  app.get('/user', isAuthenticated, user.read);
  app.get('/user/orgs', isAuthenticated, user.orgs);
  
  // repo [user, org]
  var org = require('../controllers/org');
  // repo: user
  app.get('/user/repos', isAuthenticated, user.repos);
  // repo: org
  app.get('/org/:login/repos', isAuthenticated, org.repos);


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
