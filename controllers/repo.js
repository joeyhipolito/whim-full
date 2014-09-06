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
        Image: 'whim/data',
        name: req.user.username + '-' + req.body.name
      }, function (err, container) {
        container.start(function (err, data) {
          var newContainer = Container();
          newContainer.name = req.user.username + '-' + req.body.name;
          newContainer.user = req.user._id;
          newContainer.save(function(err){
            if (err) {
              throw err;
            } else {
              docker.createContainer({
                Image: 'whim/clone',
                VolumesFrom: newContainer.name,
                Cmd: [req.body.url]
              }, function(err, cloneContainer){
                cloneContainer.start(function(err, cloneData){
                  res.json(newContainer);
                });
              });
            }
          });
        });
      });

      // docker.run('whim/data', [], process.stdout, {Binds: ['--name' + req.user.username + '-' + req.body.name]}, function(err, data){

      // }).on('container', function(container){
      //   res.json(container);
      //   container.stop();
      // })
      // create the container
      // docker.createContainer({
      //   Image: 'whim/data',
      //   name: req.user.username + '-' + req.body.name
      // }, function (err, container) {
      //   var newContainer = new Container();
      //   newContainer.name = req.user.username + '-' + req.body.name;
      //   newContainer.user = req.user._id;
      //   newContainer.save(function(err){
      //     if (err) {
      //       throw err;
      //     } else {
      //       res.json(newContainer);
      //       // clone the repository
      //       docker.run('whim/clone', [req.body.url], process.stdout, {Binds: ['--rm', '--volumes-from' + newContainer.name]}, function(err, data){
              
      //       });
      //     }
      //   });
      // });

    }
  });

}




