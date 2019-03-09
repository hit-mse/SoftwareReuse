'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('User');
const {authenticate} = require('./controllerHelper')


exports.get = function(req, res) {
  res.json("Login endpoint");
};



exports.login = function(req, res) {
  var new_task = new User(req.body);

    //TODO validate user and return

    res.json("OK");
};



