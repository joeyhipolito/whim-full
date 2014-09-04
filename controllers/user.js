'use strict';

var github = require('octonode');

exports.read = function (req, res, next) {
  
  var client = github.client(req.user.token);
  client.get('/user', {}, function (err, status, body, headers) {
    res.json(body);
  });
};