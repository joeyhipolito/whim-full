'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.query = function (req, res) {
  Container.find({'user': req.user._id}, function(err, containers){
    res.json(containers);
  });
};

exports.run = function (req, res) {
  var dataContainerID = req.param('id');
  
  Container.findOne({'cid': dataContainerID}, function(err, dataContainer){
    if (err) { res.json({ error: err })};
    if (dataContainer) {
      if (dataContainer.app.status === 'running') {
        res.json({error: 'The application is already running'});
      } else {
        console.log('not created yet');
        docker.createContainer({'Image': 'whim/npm:start'}, function (err, container) {
          dataContainer.app.id = container.id.substr(0,12);
          dataContainer.app.status = 'running';
          dataContainer.save();
          
          container.attach({stream: true, stdout: true, stderr: true, tty: true}, function (err, stream) {
            stream.pipe(process.stdout);
            container.start({'VolumesFrom': dataContainerID, 'PublishAllPorts': true}, function (err, data) {
              console.log(data);
            });
            docker.getContainer(dataContainer.app.id).inspect(function (err, data) {
              console.log(data);
              dataContainer.app.port = data.NetworkSettings.Ports['5000/tcp'][0].HostPort;
              dataContainer.save();
              res.json(dataContainer);
            });
          });
        });
      }
    }
  });
};

exports.read = function (req, res) {
  var cid = req.param('id');
  Container.findOne({'cid': cid}, function (err, dataContainer) {
    res.json(dataContainer);
  });
};

exports.stop = function (req, res) {
  var dataContainerID = req.param('id');

  Container.findOne({'cid': dataContainerID}, function (err, dataContainer) {
    if (err) { res.json({ error: err })};
    if (dataContainer) {
      if (dataContainer.app.status === 'stopped') {
        res.json({error: 'The application is not running'});
      } else {
        docker.getContainer(dataContainer.app.id).stop(function (err) {
          dataContainer.app.status = 'stopped';
          dataContainer.app.port = null;
          dataContainer.save(function (err, dataContainer) {
            res.json(dataContainer);
            docker.getContainer(dataContainer.app.id).remove(function (err, data) {
              console.log(data);
            });
          });
        });
      }
    }
  });
}