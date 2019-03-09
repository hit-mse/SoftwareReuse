import { Component, OnInit } from '@angular/core';
import { LoginStoreService } from '../login-store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private LoginStoreService: LoginStoreService) { }

  ngOnInit() {
  }

}
