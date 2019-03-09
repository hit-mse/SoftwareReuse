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

 exports.fetchStockMonthly = (stock) => {
    return new Promise((res, err) => {
        alpha.data.weekly(stock).then(data => {
            var timeSeriesKey = "Time Series (Daily)";
            res(formatData(data, timeSeriesKey, 30));
        });
    });
 }

 exports.fetchStockYearly = (stock) => {
    return new Promise((res, err) => {
        alpha.data.weekly(stock).then(data => {
            var timeSeriesKey = "Weekly Time Series";
            res(formatData(data, timeSeriesKey, 52));
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
          res(formatCompanyList(reply));
          });
    })
}

exports.getPrice = (symbol) => {
    return new Promise((res, err) => {
        alpha.data.intraday(symbol, 'compact','json','30min').then(data => {
            var timeSeriesKey = "Time Series (30min)";
            var test = formatData(data, timeSeriesKey, 1);
            console.log(test);
            res(test.prices[0]);
        });
    });
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

const formatCompanyList = (data) => {
    var bestMatches = data["bestMatches"];

    return bestMatches.map(element => {
        return {
            symbol: element['1. symbol'],
            name: element['2. name']
        }
    });

}