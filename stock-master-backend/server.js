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



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/routes.js'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
