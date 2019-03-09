import { Component, OnInit } from '@angular/core';
import { LoginStoreService } from '../login-store.service';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
  
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  newAccountUsername='';
  newAccountPassword='';
  confirmNewPassword='';
  createAccountView=false;
  constructor(private LoginStoreService: LoginStoreService,
              private LoginService: LoginService)
               { }
    
  ngOnInit() {
  }


  doLogin() {
    this.LoginService.login(this.username,this.password).subscribe(data => {
      console.log(data)
      this.LoginStoreService.login(this.username,this.password)
    },error=> {
      console.log("error")
    })
    // this.LoginStoreService.login(this.username,this.password)
    console.log(this.username)
    console.log(this.password)
  }
  changeView() {
    this.createAccountView=!this.createAccountView;
  }
}
