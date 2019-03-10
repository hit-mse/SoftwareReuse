import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs';

@Injectable()
export class StockviewService {

  

  constructor(private http: HttpClient) { 
    
  }
  queryStock(stockname, span):Observable<any>  {
    let body = {stockname, span}
    return this.http.post('http://localhost:8081/stock',body)
  }

  buyStock(stockname, amount):Observable<any>  {
    let body = {stockname, amount}
    return this.http.post('http://localhost:8081/buy',body)
  }
  sellStock(stockname, amount):Observable<any>  {
    let body = {stockname, amount}
    return this.http.post('http://localhost:8081/sell',body)
  }
}