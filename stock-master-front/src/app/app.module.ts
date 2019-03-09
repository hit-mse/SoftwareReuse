import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LoginStoreService } from './login-store.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { StockviewComponent } from './stockview/stockview.component';
import { PortfolioComponent } from './portfolio/portfolio.component'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    StockviewComponent,
    PortfolioComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [LoginStoreService],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
