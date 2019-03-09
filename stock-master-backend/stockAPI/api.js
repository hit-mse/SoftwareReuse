 const fetch = require('node-fetch');
 const _ = require('underscore')
 
 const apiKey = "YUAP06KQZGPE0WXM";;
 const baseURL = "https://www.alphavantage.co/";
 const prequerystring = "query?function=SYMBOL_SEARCH&keywords="; 

 const alpha = require('alphavantage')({ key: apiKey });
 

 exports.fetchStockDaily = (stock) => {
    return new Promise((res, err) => {
        alpha.data.intraday(stock, 'compact','json','30min').then(data => {
            var timeSeriesKey = "Time Series (30min)";

            const allDataPoints = _.keys(data['Time Series (30min)']);
            const currentDate = allDataPoints[0].split(' ')[0];

            let amountOfIntressedDataPoints = 0;

            _.forEach(allDataPoints, (element) => {
                const date = element.split(' ')[0];
                if (date === currentDate){
                    amountOfIntressedDataPoints += 1;
                }
            });
            res(formatData(data, timeSeriesKey, amountOfIntressedDataPoints));
        });
    });
 }

 exports.fetchStockWeekly = (stock) => {
    return new Promise((res, err) => {
        alpha.data.daily(stock).then(data => {
            var timeSeriesKey = "Time Series (Daily)";
            res(formatData(data, timeSeriesKey, 7));
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

const formatData = (data, timeSeriesKey, points) => {
    var timeSeries = data[timeSeriesKey];
    var timestamps = _.keys(timeSeries).slice(0,points);

    const prices = _.map(timestamps, (element) => {
        return timeSeries[element]['1. open'];
    })
    return {
        prices,
        timestamps,
    };
}