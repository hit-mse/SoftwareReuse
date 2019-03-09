import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { log } from 'util';

@Injectable()
export class LoginStoreService {
  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user = {
    username: "",
    password: "",
    money: 0,
    stocks: {}
  };
  

  constructor() { 
    this.isUserLoggedIn
  }

  login(user)  {
    console.log("User logged in:");
    this.user.username = user.username;
    this.user.password = user.password;
    this.user.money = user.money;
    this.user.stocks = user.stocks;
    console.log(this.user);
    
    this.isUserLoggedIn.next(true);
  }
  logout(){
    this.user = {
      username: "",
      password: "",
      money: 0,
      stocks: {}
    };
    this.isUserLoggedIn.next(false);
  }
}
