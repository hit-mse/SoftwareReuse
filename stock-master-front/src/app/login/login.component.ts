import { Component, OnInit } from '@angular/core';
import { LoginStoreService } from '../login-store.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  newAccountUsername='';
  newAccountPassword='';
  confirmNewPassword='';
  createAccountView=false;
  constructor(private LoginStoreService: LoginStoreService) { }
    
  ngOnInit() {
  }


  doLogin() {
    this.LoginStoreService.login(this.username,this.password)
    console.log(this.username)
    console.log(this.password)
  }
  changeView() {
    this.createAccountView=!this.createAccountView;
  }
}
