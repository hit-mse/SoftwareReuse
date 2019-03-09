 const fetch = require('node-fetch');
 
 const apiKey = "YUAP06KQZGPE0WXM";;
 const baseURL = "https://www.alphavantage.co/";
 const prequerystring = "query?function=SYMBOL_SEARCH&keywords="; 

 const alpha = require('alphavantage')({ key: apiKey });
 

 exports.fetchStockDaily = (stock) => {
    return new Promise((res, err) => {
        alpha.data.daily(stock).then(data => {
            res({
                data,
                dataname: ""
            })
        });
    });
 }

 exports.fetchStockWeekly = (stock) => {
    return new Promise((res, err) => {
        alpha.data.weekly(stock).then(data => {
            res(data)
        });
    });
 }

 exports.fetchStockMonthly = (stock) => {
    return new Promise((res, err) => {
        alpha.data.monthly(stock).then(data => {
            res(data)
        });
    });
 }

exports.searchStock = (searchterm) => {
    return new Promise((res, err) => {
        const query = `${baseURL}${prequerystring}${searchterm}&apikey=${apiKey}`;
        fetch(query, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(reply =>  reply.json())
          .then(reply => {
                res(reply);
          });
    })
}