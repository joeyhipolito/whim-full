'use strict';

var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.clone = function(req, res) {
  Container.findOne({'name' : req.user.username + '-' + req.body.name}, function(err, container) {
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
              docker.run('whim/clone', [req.body.url, '.'], process.stdout, {}, {"VolumesFrom": newContainer.name}, function(err, cloneData){
                res.json(newContainer);
              });
            }
          });
        });
      });
    }
  });

}




