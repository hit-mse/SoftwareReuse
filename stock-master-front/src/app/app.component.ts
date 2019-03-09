import { Component } from '@angular/core';
import { LoginStoreService } from './login-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn=false;
  constructor(
    private LoginStoreService: LoginStoreService,
  ) {

    LoginStoreService.isUserLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn=isLoggedIn;
    })
  }



}
