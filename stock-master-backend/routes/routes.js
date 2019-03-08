module.exports = function(app) {
  var loginController = require('../controllers/loginController.js');
  var transactionController = require('../controllers/transactionController.js');
  var stockController = require('../controllers/stockController.js');


  // todoList Routes
  app.route('/login')
    .get(loginController.get)
    .post(loginController.login);
  app.route('/buy')
    .get(transactionController.get)
    .post(transactionController.buy);

  app.route('/sell')
    .get(transactionController.get)
    .post(transactionController.sell);

   app.route('/stock')
    .get(stockController.get)
    .post(stockController.getStock);
};
