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
  docker.createContainer({'Image': 'whim/node'}, function (err, container) {
    res.json(container);
    container.attach({stream: true, stdout: true, stderr: true, tty: true}, function (err, stream) {
      stream.pipe(process.stdout);
      container.start({'VolumesFrom': dataContainer, 'PublishAllPorts': true}, function (err, data) {
        console.log(data);
      });
    })
  });
};

exports.read = function (req, res) {
  var dataContainer = req.param('id');
  
}