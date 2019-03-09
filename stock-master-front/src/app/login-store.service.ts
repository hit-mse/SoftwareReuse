import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginStoreService {
  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  username ="";
  password ="";
  

  constructor() { 
    this.isUserLoggedIn
  }

  login(username, password)  {
    this.username = username;
    this.password = password;
    this.isUserLoggedIn.next(true);
  }
  logut(){
    this.username = "";
    this.password = "";
    this.isUserLoggedIn.next(false);
  }
}
