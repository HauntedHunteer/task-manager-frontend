import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  onLogOut() {
    this.tokenStorageService.logOut();
  }

}
