
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'No username provided'
  },
  password: {
    type: String,
    required: 'No password provided'
  },
  money:{
      type: Number,
  }
});


module.exports = mongoose.model('User', UserSchema);