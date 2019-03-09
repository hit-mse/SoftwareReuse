import { Component, OnInit } from '@angular/core';
import { StockviewService } from './stockview.service';
import { log } from 'util';

@Component({
  selector: 'app-stockview',
  templateUrl: './stockview.component.html',
  styleUrls: ['./stockview.component.css'],
  providers: [StockviewService]
})
export class StockviewComponent implements OnInit {
  currentStock: string ="";
  currentTimespan: string = 'day';
  timespans: string[] = ['day', 'week', 'month', 'year'];
  constructor(private StockviewService:StockviewService) { }

  ngOnInit() {
  }

  queryStock(){
    console.log("blyat");
    
    console.log(this.currentStock);
    console.log(this.currentTimespan);
    
    
    this.StockviewService.queryStock(this.currentStock,this.currentTimespan).subscribe(data => {
      console.log(data);
      
    },
    error => {
      console.log(error);
      
    })
  }

}
