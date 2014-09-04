'use strict';

var github = require('octonode');

exports.read = function (req, res) {
  var client = github.client(req.user.token);

  var login = req.param('login');
  var uri = '';
  uri = req.user.username === login ? '/user/repos' : '/orgs/' + login + '/repos';

  client.get(uri, {}, function (err, status, body, headers) {
    res.json(body);
  });
};