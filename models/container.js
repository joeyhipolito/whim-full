var mongoose = require('mongoose');

var containerSchema = mongoose.Schema({
  name          : String,
  user          : String,
  status        : String,
  createdAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Container', containerSchema);
