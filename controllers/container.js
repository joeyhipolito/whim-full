'use strict';

var Container = require('../models/container');
var docker = require('dockerode');

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
      var newContainer = new Container();
      newContainer.name      = req.body.name;
      newContainer.user      = req.user._id;
      newContainer.status    = 'ok';
      // save
      newContainer.save(function(err){
        if (err) {
          throw err;
        }
        res.json(newContainer);
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