'use strict';

var github = require('octonode');
var Feedback = require('../models/feedback');
var User = require('../models/user');

exports.read = function (req, res) {

  User.findOne({'username': req.user.username}, function(err, user) {
    Feedback.findOne({'user': user._id}, function(err, feed){
      res.json(feed);
    });
  });
};

exports.feed = function (req, res) {
  // res.json(req.body.feedback);
  User.findOne({'username': req.user.username}, function(err, user) {
    Feedback.findOne({'user': user._id}, function(err, feed){
      if (err) {
        res.json(err);
        console.log('here1');
      }

      if (feed) {
        console.log('here2');
        feed.feedback = req.body.feedback;
        feed.save(function(err, data){
          res.json(data);
        });
      } else {
        console.log('here3');
        var feedback = new Feedback();
        feedback.user = user._id;
        feedback.feedback = req.body.feedback;
        feedback.save(function(err, data){
          res.json(data);
        });
      }
    });
  });
}