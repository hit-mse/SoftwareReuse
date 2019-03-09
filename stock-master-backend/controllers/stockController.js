var mongoose = require('mongoose')
const {fetchStockDaily,fetchStockWeekly, fetchStockMonthly,searchStock} = require('../stockAPI/api')

exports.get = function(req, res) {
  fetchStockDaily("MSFT");
  res.json("stockAPI endpoint");
};


exports.getStock = function(req, res) {
    var {stockname, span} = req.body;

    let promise;
    if(span === "day"){
      promise = fetchStockDaily(stockname);
    } 
    else if(span === "week"){
      promise = fetchStockWeekly(stockname);
    } 
    else if(span === "month"){
      promise = fetchStockMonthly(stockname);
    }
    promise.then((data)=>{
      res.json(data)
    })
    .catch();

};

exports.searchStocks= function(req, res) {
  var {queryname} = req.body;

};





  


