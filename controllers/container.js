'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.query = function (req, res) {
  Container.find({'user': req.user._id}, function(err, containers){
    res.json(containers);
  })
};

exports.run = function (req, res) {
  var cid = req.param('id');
  
  docker.createContainer({'Image': 'whim/node'}, function (err, container) {
    Container.findOne({'cid': cid}, function(err, dataContainer){
      dataContainer.worker = {
        id: container.id.substr(0,8),
        status: 'running'
      };
      dataContainer.save();
    });
    res.json({worker: container.id});
    container.attach({stream: true, stdout: true, stderr: true, tty: true}, function (err, stream) {
      stream.pipe(process.stdout);
      container.start({'VolumesFrom': cid, 'PublishAllPorts': true}, function (err, data) {
        console.log(data);
      });
    })
  });
};

exports.read = function (req, res) {
  var cid = req.param('id');

  var container = docker.getContainer(cid);
  container.inspect(function(err, data){
    res.json(data);
  });
};

exports.stop = function (req, res) {
  var cid = req.param('id');
  docker.getContainer(cid).stop(function(err, data){
    res.json(data);
  });
}