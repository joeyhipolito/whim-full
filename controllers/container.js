'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.create = function (req, res) {
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
        Image: 'stackbrew/busybox:latest',
        name: req.body.name,
        Volumes: {
          '/data': {}
        }
      }, function (err, container) {
        var newContainer = new Container();
        newContainer.name = req.user.username + '-' + req.body.name;
        newContainer.user = req.user._id;
        newContainer.save(function(err){
          if (err) {
            throw err;
          } else {
            res.json(newContainer);
          }
        });
      });
    }
  });
};

exports.query = function (req, res) {
  Container.find({'user': req.user._id}, function(err, containers){
    res.json(containers);
  })
}

exports.run = function (req, res) {
  res.json({'yo': true});
};