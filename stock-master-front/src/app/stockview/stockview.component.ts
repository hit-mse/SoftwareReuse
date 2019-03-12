import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StockviewService } from './stockview.service';
import { Chart } from 'chart.js';
import { LoginStoreService } from '../login-store.service';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-stockview',
  templateUrl: './stockview.component.html',
  styleUrls: ['./stockview.component.css'],
  providers: [StockviewService, LoginService, MatSnackBar]
})
export class StockviewComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  currentTrend: any;
  currentStock: string = "";
  currentTimespan: string = 'day';
  queriedStock: string = "";
  timespans: string[] = ['day', 'week', 'month', 'year'];
  chart: any;
  trendStyle = {};
  currentPrice: any;
  numberOfShares: any;
  isLoading: boolean = false;

  constructor(private StockviewService: StockviewService,
    private LoginStoreService: LoginStoreService,
    private LoginService: LoginService,
    private SnackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
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

  queryStock() {


    if (!this.currentStock) {
      return;
    }
    this.isLoading = true;
    this.StockviewService.queryStock(this.currentStock, this.currentTimespan).subscribe(data => {
      this.showGraph(data);
      this.createTrend(data);
      this.queriedStock = this.currentStock;
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
        this.SnackBar.open("Request failed", "Okay", { duration: 3000, panelClass: "failed" })
        console.log(error);
      })
  }
  buyStock() {
    this.isLoading = true;
    this.StockviewService.buyStock(this.queriedStock, this.numberOfShares, this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(res => {
      this.LoginService.login(this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(user => {
        this.LoginStoreService.login(user, this.LoginStoreService.password);
        this.isLoading = false;
        this.SnackBar.open("Transaction sucessful", "Okay", { duration: 3000, panelClass: "successful" })
      })
    },
      err => {
        this.isLoading = false;
        this.SnackBar.open("Transaction failed", "Okay", { duration: 3000, panelClass: "failed" })
      })
  }

  sellStock() {
    this.isLoading = true;
    this.StockviewService.sellStock(this.queriedStock, this.numberOfShares, this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(res => {
      this.LoginService.login(this.LoginStoreService.user.username, this.LoginStoreService.password).subscribe(user => {
        this.LoginStoreService.login(user, this.LoginStoreService.password);
        this.SnackBar.open("Transaction sucessful", "Okay", { duration: 3000, panelClass: "successful" })
        this.isLoading = false;
      })
    },
      err => {
        this.isLoading = false;
        this.SnackBar.open("Transaction failed", "Okay", { duration: 3000, panelClass: "failed" })
      })
  }

  createTrend(data) {
    var dataPoints = data.prices.length;
    var currentStockPrice = data.prices[dataPoints - 1];

    var openingStockPrice = data.prices[0];
    var trend = (currentStockPrice / openingStockPrice) * 100;
    this.currentPrice = currentStockPrice;

    var trendString = "";
    if (trend < 100) {
      trend = 100 - trend;
      trendString = "-";
      this.trendStyle = { 'color': 'red', 'margin-bottom': '20px' }
    } else {
      trend = trend - 100;
      trendString = "+";
      this.trendStyle = { 'color': 'green', 'margin-bottom': '20px' }
    }
    this.currentTrend = trendString + Number(trend).toFixed(2);
  }
  updateCurrentStock(event) {
    if (!this.queriedStock) {
      return;
    }
    this.isLoading = true;
    
    this.StockviewService.queryStock(this.queriedStock, event.value).subscribe(data => {
      this.showGraph(data);
      this.createTrend(data);
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
        console.log(error);
        this.SnackBar.open("Request failed", "Okay", { duration: 3000, panelClass: "failed" })
      })
   
  }


  showGraph(data) {
    
    this.chart.data.labels = data.timestamps.reverse();
    this.chart.data.datasets.forEach( (dataset) => {
      dataset.data = data.prices.reverse();
    });
    this.chart.update();
  }

}
