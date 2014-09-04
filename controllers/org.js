'use strict';

var github = require('octonode');

exports.repos = function (req, res) {
  var client = github.client(req.user.token);
  var login = req.param('login');
  client.get('/orgs/' + login + '/repos', {}, function (err, status, body, headers) {
    res.json(body);
  });
};