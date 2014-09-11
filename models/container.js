var mongoose = require('mongoose');

var containerSchema = mongoose.Schema({
  cid           : String,
  name          : String,
  user          : String,
  status        : String,
  worker        : {
    id     : { type: String },
    status : { type: String, default: 'stopped'}
  },
  createdAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Container', containerSchema);
