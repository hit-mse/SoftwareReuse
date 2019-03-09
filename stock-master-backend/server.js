'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8081,
  mongoose = require('mongoose'),
  {MongoClient} = require('mongodb'),
  User = require('./models/user.js'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db' ,{ useNewUrlParser: true }).then(() => {
  console.log("Connected")
  mongoose.connection.dropCollection('user', () => {
    console.log("Deleted")
    const testUser = new User({
      username: "testuser",
      password: "test",
      money: 500,
      stocks: {
        google: 5
      }
    })
    testUser.save((err, user)=>{
      console.log(`Saved user ${user}`)
    });
  })
}); 


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./routes/routes.js'); //importing route
routes(app); //register the route


var server = app.listen(port);
server.timeout = 5000;


console.log('todo list RESTful API server started on: ' + port);
