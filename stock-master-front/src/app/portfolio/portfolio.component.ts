import { Component, OnInit } from '@angular/core';
import { LoginStoreService } from '../login-store.service';
import { _ } from 'underscore';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  userstocks = [];

  constructor(private LoginStoreService: LoginStoreService) { 
    this.userstocks = _.keys(this.LoginStoreService.user.stocks)
    this.LoginStoreService.isUserLoggedIn.subscribe(isLoggedIn => {
      this.userstocks = _.keys(this.LoginStoreService.user.stocks)

    })
  }

  ngOnInit() {
  }







}
