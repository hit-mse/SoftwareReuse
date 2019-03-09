var mongoose = require('mongoose'),
  User = mongoose.model('user');

const {authenticate} = require('./controllerHelper')
const {getPrice} = require('../stockAPI/api');
const _ = require('underscore');

exports.get = function(req, res) {
  res.json("transaction endpoint");
};

const test = {
  USERNAME: "",
  password: "",
  stockname: "",
  shares: "",
}

const testuser = {
  username: 'testuser',
  password: 'test',
  money: 500,
  stocks: { 'GOOGL': 5 }
}



exports.buy = function(req, res) {
  console.log(req.body)
  authenticate(req.body.username, req.body.password).then((authenticated)=>{
    if(authenticated){
       var promise1 = User.findOne({username: req.body.username})
       var promise2 = getPrice(req.body.stockname);

       Promise.all([promise1, promise2]).then((promises) => {
         const user = promises[0];
         const price = promises[1] * req.body.shares;
         
         if(user.money < price) {
           res.status(401).res(false);
           return;
          }
          const balace = user.money - price;

          user.money = balace;
          if (!user.stocks[req.body.stockname]) user.stocks[req.body.stockname] = 0;


          user.stocks[req.body.stockname] = user.stocks[req.body.stockname] + req.body.shares;
          User.findOneAndUpdate({username: req.body.username}, { $set: user }).then(res => {
            console.log('Buy complete');
          });

       });
    }else{
      res.status(401).send(authenticated)
    }
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
  


