import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  [x: string]: any;


  constructor(private http: HttpClient) { 

  }

  login(username, password):Observable<any>  {
    let body = {username, password}
    return this.http.post('http://localhost:8081/login',body)
  }
  logut(){
 
  }
}
