'use strict';

var github = require('octonode');

exports.query = function (req, res) {
  var repo = req.param('id');
  var pathOrFile = req.param('file') || '';
  var client = github.client(req.user.token);
  var uri = '/repos/' + req.user.username + '/' + repo + '/contents/' + pathOrFile;

  client.get(uri, {}, function (err, status, body, headers) {
    res.json(body);
  });
}

exports.read = function (req, res) {
  var repo = req.param('id');
  var pathOrFile = req.param('file') || '';
  var client = github.client(req.user.token);
  
  var uri = '/repos/' + req.user.username + '/' + repo + '/contents/' + pathOrFile;

  client.get(uri, {}, function (err, status, body, headers) {
    res.json(body);
  });
}

exports.update = function (req, res) {
  var  path = '',
    message = '',
    content = '',
        sha = '',
     branch = 'master';
}




