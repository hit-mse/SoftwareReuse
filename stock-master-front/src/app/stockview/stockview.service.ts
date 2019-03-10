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

  buyStock(stockname, shares, username, password):Observable<any>  {
    let body = {stockname, shares, username, password}    
    console.log(body);
    
    return this.http.post('http://localhost:8081/buy',body)
  }

  sellStock(stockname, shares, username, password):Observable<any>  {
    let body = {stockname, shares, username,password}
    return this.http.post('http://localhost:8081/sell',body)
  }
}