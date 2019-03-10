import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { log } from 'util';

@Injectable()
export class LoginStoreService {
  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user = {
    username: "",
    money: 0,
    stocks: {}
  };
  password = "";

  

  constructor() { 
    this.isUserLoggedIn
  }

  login(user, password)  {
    this.user.username = user.username;
    this.password = password;
    this.user.money = user.money;
    this.user.stocks = user.stocks;
    console.log(this.user);
    
    this.isUserLoggedIn.next(true);
  }
  logout(){
    this.user = {
      username: "",
      money: 0,
      stocks: {}
    };
    this.password = "";

    this.isUserLoggedIn.next(false);
  }
}
