var mongoose = require('mongoose'),
  User = mongoose.model('User');

const {authenticate} = require('./controllerHelper')

exports.get = function(req, res) {
  res.json("transaction endpoint");
};



exports.buy = function(req, res) {
  var new_task = new User(req.body);

    //TODO stuff

  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.sell = function(req, res) {
    var new_task = new User(req.body);
  
      //TODO stuff
  
    new_task.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };
  


