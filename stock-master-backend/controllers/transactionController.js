var mongoose = require('mongoose'),
  User = mongoose.model('user');

const {authenticate} = require('./controllerHelper')
const {getPrice} = require('../stockAPI/api');
const _ = require('underscore');

exports.get = function(req, res) {
  res.json("transaction endpoint");
};

// const req.body = {
//   USERNAME: "",
//   password: "",
//   stockname: "",
//   shares: "",
// }

// const userObject = {
//   username: 'testuser',
//   password: 'test',
//   money: 500,
//   stocks: { 'GOOGL': 5 }
// }



exports.buy = function(req, res) {
  console.log(req.body)
  authenticate(req.body.username, req.body.password).then((authenticated)=>{
    if(authenticated){
       var promise1 = User.findOne({username: req.body.username})
       var promise2 = getPrice(req.body.stockname);

       Promise.all([promise1, promise2]).then((promises) => {
         const user = promises[0];
         const price = promises[1] * req.body.shares;
         const stockname = req.body.stockname.toUpperCase();
         
         if(user.money < price) {
           console.log(`User ${req.body.username} can't afford ${req.body.shares} shares`);
           res.status(401).send(false);
           return;
          }
          const balace = user.money - price;

          user.money = balace;
          if (!user.stocks[stockname]) user.stocks[stockname] = 0;

          user.stocks[stockname] = user.stocks[stockname] + req.body.shares;
          User.findOneAndUpdate({username: req.body.username}, { $set: user }).then(user => {
            console.log(`${req.body.username} successfully bought ${req.body.shares} of ${stockname} for ${price}`);
            res.status(200).send(true);
          });

       });
    }else{
      res.status(401).send(authenticated)
    }
  });  
};

exports.sell = function(req, res) {
    authenticate(req.body.username, req.body.password).then((authenticated) => {
      if (!authenticated){
        res.status(401).send(authenticated);
        return;
      }

      const promise1 = User.findOne({username: req.body.username});
      const promise2 = getPrice(req.body.stockname);

      Promise.all([promise1, promise2]).then((promises) => {
        const user = promises[0];
        const reqStockPrice = promises[1] * req.body.shares;
        const stockname = req.body.stockname.toUpperCase();

        if (user.money < reqStockPrice){
          res.status(401).send(false);
          return;
        }

        if (user.stocks[stockname] - req.body.shares < 0 ){
          console.log('Cant sell more stocks than you own');
          res.status(401).send(false);
          return;
        }

        const sharesLeft = user.stocks[stockname] - req.body.shares;

        user.stocks[stockname] = sharesLeft;
        user.money = user.money + reqStockPrice;

        User.findOneAndUpdate({username: req.body.username}, { $set: user }).then((user) => {
          console.log(`${req.body.username} successfully sold ${req.body.shares} of ${stockname} for ${reqStockPrice}`);
          res.status(200).send(true);
        });

      });

    });
  };
  


