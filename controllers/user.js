'use strict';

var github = require('octonode');

exports.read = function (req, res, next) {
  
  var client = github.client();
  client.get('/user?access_token=' + req.user.token, {}, function (err, status, body, headers) {
    res.json(body);
  });
};