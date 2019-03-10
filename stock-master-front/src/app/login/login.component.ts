import { Component, OnInit } from '@angular/core';
import { LoginStoreService } from '../login-store.service';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, MatSnackBar]
  
})
export class LoginComponent implements OnInit {
  username="";
  password="";
  newAccountUsername='';
  newAccountPassword='';
  confirmNewPassword='';
  createAccountView=false;
  constructor(private LoginStoreService: LoginStoreService,
              private LoginService: LoginService,
              private SnackBar: MatSnackBar)
              
               { }
    
  ngOnInit() {
  }


  doLogin() {

    this.LoginService.login(this.username,this.password).subscribe(data => {
      this.LoginStoreService.login(data, this.password)
    },error=> {
      console.log("error")
      this.SnackBar.open("Login failed. Check your credentials", "Okay", {duration: 3000, panelClass: "failed"})
    })
    // this.LoginStoreService.login(this.username,this.password)
  }
  changeView() {
    this.createAccountView=!this.createAccountView;
  }
}
