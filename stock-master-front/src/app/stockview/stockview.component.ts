import { Component, OnInit, ViewChild } from '@angular/core';
import { StockviewService } from './stockview.service';
import { Chart } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LoginStoreService } from '../login-store.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-stockview',
  templateUrl: './stockview.component.html',
  styleUrls: ['./stockview.component.css'],
  providers: [StockviewService, LoginService]
})
export class StockviewComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  currentTrend: any;
  currentStock: string = "";
  currentTimespan: string = 'day';
  queriedStock: string = "";
  timespans: string[] = ['day', 'week', 'month', 'year'];
  chart: any;
  trendStyle={};
  currentPrice: any;
  numberOfShares: any;

  constructor(private StockviewService: StockviewService, private LoginStoreService: LoginStoreService, private LoginService: LoginService) { }

  ngOnInit() {
  }

  queryStock() {
    console.log("blyat");
    var dataPrices=["1138.7704","1143.4800","1149.8400","1152.3250","1149.6000","1145.5250","1143.9900","1139.7500","1140.8300","1141.9900","1146.0000",
    "1145.2300"].reverse();
    var dataTimespans =["2019-03-08 10:00:00","2019-03-08 10:30:00","2019-03-08 11:00:00","2019-03-08 11:30:00","2019-03-08 12:00:00","2019-03-08 12:30:00","2019-03-08 13:00:00","2019-03-08 13:30:00","2019-03-08 14:00:00","2019-03-08 14:30:00","2019-03-08 15:00:00","2019-03-08 15:30:00"].reverse();
    var dummyData = {prices:dataPrices, timestamps:dataTimespans}
    console.log(this.currentStock);
    console.log(this.currentTimespan);
    if(!this.currentStock){
      return;
    }

    this.StockviewService.queryStock(this.currentStock, this.currentTimespan).subscribe(data => {
      console.log(data);
      this.showGraph(data);
      this.createTrend(data);
      this.queriedStock = this.currentStock;
    },
      error => {
        console.log(error);

      })
  }
  buyStock(){
      this.StockviewService.buyStock(this.queriedStock,this.numberOfShares, this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(res => {
        this.LoginService.login(this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe( user => {
          this.LoginStoreService.login(user, this.LoginStoreService.password);
        })
      })
  }

  sellStock(){
    this.StockviewService.sellStock(this.queriedStock,this.numberOfShares, this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(res => {
      this.LoginService.login(this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe( user => {
        this.LoginStoreService.login(user, this.LoginStoreService.password);
      })
    })
  }

  createTrend(data){
    var dataPoints = data.prices.length;
    var currentStockPrice = data.prices[dataPoints-1];
    
    var openingStockPrice = data.prices[0];
    var trend = (currentStockPrice/openingStockPrice)*100;
    this.currentPrice=currentStockPrice;
    
    var trendString="";
    if(trend < 100){
      trend=100-trend;
      trendString="-";
      this.trendStyle = {'color':'red', 'margin-bottom':'20px'}
    }else{
      trend=trend-100;
      trendString="+";
      this.trendStyle = {'color':'green','margin-bottom':'20px'}
    }
    this.currentTrend = trendString + Number(trend).toFixed(2);
  }
  updateCurrentStock() {
    if(!this.queriedStock){
      return;
    }
    this.StockviewService.queryStock(this.queriedStock, this.currentTimespan).subscribe(data => {
      this.showGraph(data);
    },
      error => {
        console.log(error);

      })
  }

 
  showGraph(data) {
    // console.log(data.prices.toString());
    // console.log(data.timestamps.toString());
    
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.timestamps.reverse(), // your labels array
        datasets: [
          {
            data: data.prices.reverse(), // your data array
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });


  }

}
