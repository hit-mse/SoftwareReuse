'use strict';



var mongoose = require('mongoose'),
  User = mongoose.model('user');
const {authenticate} = require('./controllerHelper')



exports.get = function(req, res) {

    res.json("loggin")
  
  
};

exports.login = function(req, res) {
  authenticate(req.body.username, req.body.password).then((authenticated)=>{
    console.log("HEJHEJ" + authenticated)
    if(authenticated){
      console.log("INNE")
      res.status(200).send(authenticated)
    }else{
      res.status(401).send(authenticated)
    }
  });  
};



