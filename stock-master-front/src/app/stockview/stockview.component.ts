import { Component, OnInit, ViewChild } from '@angular/core';
import { StockviewService } from './stockview.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-stockview',
  templateUrl: './stockview.component.html',
  styleUrls: ['./stockview.component.css'],
  providers: [StockviewService]
})
export class StockviewComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;

  currentStock: string = "";
  currentTimespan: string = 'day';
  timespans: string[] = ['day', 'week', 'month', 'year'];
  chart: any;

  constructor(private StockviewService: StockviewService) { }

  ngOnInit() {
  }

  queryStock() {
    console.log("blyat");

    console.log(this.currentStock);
    console.log(this.currentTimespan);


    this.StockviewService.queryStock(this.currentStock, this.currentTimespan).subscribe(data => {
      console.log(data);
      this.showGraph(data);
    },
      error => {
        console.log(error);

      })
  }

  showGraph(data) {

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
