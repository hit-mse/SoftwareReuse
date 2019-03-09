'use strict';



var mongoose = require('mongoose'),
  User = mongoose.model('user');
const {authenticate} = require('./controllerHelper')



exports.get = function(req, res) {

    res.json("loggin")
  
  
};

exports.login = function(req, res) {
  authenticate(req.body.username, req.body.password).then((authenticated)=>{
    res.json({authenticated});
  });  
};



