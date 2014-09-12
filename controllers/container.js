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
  
  Container.findOne({'cid': cid}, function(err, dataContainer){
    if (err) {
      res.json({
        error: true,
        message: err
      });
    }
    if (dataContainer) {
      if (dataContainer.worker.status === 'running') {
        res.json({error: true, message: 'The application is already running'});
      } else {
        docker.createContainer({'Image': 'whim/node'}, function (err, container) {
          dataContainer.worker = {
            id: container.id.substr(0, 12),
            status: 'running'
          };
          dataContainer.save();
          
          container.attach({stream: true, stdout: true, stderr: true, tty: true}, function (err, stream) {
            stream.pipe(process.stdout);
            container.start({'VolumesFrom': cid, 'PublishAllPorts': true}, function (err, data) {
              console.log(data);
            });
            docker.getContainer(dataContainer.worker.id).inspect(function (err, data) {
              console.log(data);
              dataContainer.worker.app = data.NetworkSettings.Ports['5000/tcp'][0].HostPort;
              dataContainer.worker.term = data.NetworkSettings.Ports['8080/tcp'][0].HostPort;
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

    // docker.getContainer(cid).inspect(function(err, data){
    //   res.json(data);
    // });
    res.json(dataContainer);
  });
};

exports.stop = function (req, res) {
  var cid = req.param('id');
  Container.findOne({'cid': cid}, function (err, dataContainer) {
    res.json({
      createdAt: "2014-09-11T08:12:18.856Z",
      cid: cid,
      name: "helloworld",
      user: "540ea0648949ea5c112b609c",
      worker: {id: "e498fb45", status: "stopped"}
    });
  });
  // docker.getContainer(cid).stop(function(err){
  //   if (err !== null) {
  //     res.json({stopped: true});
  //   } else {
  //     res.json({stopped: false});
  //   }
  // });
}