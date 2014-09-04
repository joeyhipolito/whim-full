'use strict';

var github = require('octonode');

exports.read = function (req, res) {
  var client = github.client(req.user.token);
  client.get('/user', {}, function (err, status, body, headers) {
    res.json(body);
  });
};

exports.repos = function (req, res) {
  var client = github.client(req.user.token);
  client.get('/user/repos', {}, function (err, status, body, headers) {
    res.json(body);
  });
};

exports.orgs = function (req, res) {
  var client = github.client(req.user.token);
  client.get('/user/orgs', {}, function (err, status, body, headers) {
    res.json(body);
  });
};