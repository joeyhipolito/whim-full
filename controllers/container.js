'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.query = function (req, res) {
  Container.find({'user': req.user._id}, function(err, containers){
    res.json(containers);
  })
}

exports.run = function (req, res) {
  var dataContainer = req.param('id');
  // docker.createContainer({
  //   Image: 'whim/exec',
  //   VolumesFrom: dataContainer,
  //   Tty: true,
  //   PublishAllPorts: true
  // }, function (err, container){
  //   container.start(function (err) {
  //     container.inspect(function (err, data) {
  //       res.json(data);
  //     });
  //   });
  // });
  docker.run('whim/exec', [], [], {}, {"VolumesFrom": dataContainer, "PublishAllPorts": true}, function(err){
    if (err) {
      throw err;
    };
  }).on('container', function (err, container) {
    res.json(container);
  })
};

exports.read = function (req, res) {
  var dataContainer = req.param('id');
  
}