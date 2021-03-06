'use strict';

var _= require('underscore');

var mongoose = require('mongoose'),
  User = mongoose.model('user');
const {authenticate} = require('./controllerHelper')



exports.get = function(req, res) {
  res.json("login")  
};

exports.login = function(req, res) {
  authenticate(req.body.username, req.body.password).then((authenticated)=>{
    if(authenticated){
       User.findOne({username: req.body.username}).then(user => {

        const {username, money, stocks} = user

        res.status(200).send({
          username,
          money,
          stocks
        })
       })
    }else{
      res.status(401).send(authenticated)
    }
  });  
};



