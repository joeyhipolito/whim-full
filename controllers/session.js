'use strict';

exports.session = function (req, res) {
  res.json({
    "id": req.user._id,
    "username": req.user.username,
    "name": req.user.name,
    "email": req.user.email
  });
};

exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.json({
      "loggedOut" : true
    });
  } else {
    res.status(400);
    res.json({
      "error" : true,
      "message": "You are not logged in."
    });
  }
}