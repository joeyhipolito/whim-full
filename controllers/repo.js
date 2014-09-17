'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var github = require('octonode');

exports.clone = function(req, res) {
  Container.findOne({'name' : req.body.name}, function(err, container) {
    if (err) {
      res.json({error: err});
    }
    if (container) {
      res.json({
        error: 'name already taken.'
      });
    } else {
      docker.createContainer({
        Image: 'whim/data'
      }, function (err, container) {
        container.start(function (err, data) {
          var newContainer = Container();
          newContainer.cid  = container.id.substr(0, 12);
          newContainer.name = req.body.name;
          newContainer.user = req.user._id;
          newContainer.save(function(err){
            if (err) {
              throw err;
            } else {
              docker.run('whim/clone', [req.body.url, '.'], process.stdout, {}, {"VolumesFrom": newContainer.cid}, function(err, cloneData){
                res.json(newContainer);
              });
            }
          });
        });
      });
    }
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




