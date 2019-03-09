var mongoose = require('mongoose')
const {fetchStockDaily,fetchStockWeekly, fetchStockMonthly,fetchStockYearly,searchStock} = require('../stockAPI/api')

exports.get = function(req, res) {
  searchStock("MSFT");
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
    else if(span === "year"){
      promise = fetchStockYearly(stockname);
    }
    promise.then((data)=>{
      res.json(data)
    })
    .catch();

};

exports.searchStocks= function(req, res) {
  var {queryname} = req.body;
  searchStock(queryname).then((data) => {
    res.json(data);
  });
};





  


