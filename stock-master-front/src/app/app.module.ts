import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LoginStoreService } from './login-store.service';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [LoginStoreService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
