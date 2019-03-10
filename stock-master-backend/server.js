'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8081,
  mongoose = require('mongoose'),
  {MongoClient} = require('mongodb'),
  User = require('./models/user.js'), //created model loading here
  bodyParser = require('body-parser');
  
var cors = require('cors');
app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db' ,{ useNewUrlParser: true }).then(() => {
  mongoose.connection.dropCollection('users', () => {
    const testUser = new User({
      username: "testuser",
      password: "test",
      money: 500000,
      stocks: {
        BABA: 5,
        GOOGL: 1
      }
    })
    const testUser2 = new User({
      username: "oscar",
      password: "test",
      money: 1000,
      stocks: {
        GOOGL: 5
      }
    })
    testUser.save((err, user)=>{
      console.log(`Saved user ${user}`)
    });
    testUser2.save((err, user)=>{
      console.log(`Saved user ${user}`)
    });
  })
}); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./routes/routes.js'); //importing route
routes(app); //register the route





var server = app.listen(port);
server.timeout = 5000;


console.log('todo list RESTful API server started on: ' + port);
