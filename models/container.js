var mongoose = require('mongoose');

var containerSchema = mongoose.Schema({
  cid           : String,
  name          : String,
  user          : String,
  status        : String,
  term          : {
    id     : String,
    status : { type: String, default: 'stopped'},
    port   : Number
  },
  app           : {
    id     : String,
    status : { type: String, default: 'stopped'},
    port   : Number
  },
  createdAt     : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Container', containerSchema);
