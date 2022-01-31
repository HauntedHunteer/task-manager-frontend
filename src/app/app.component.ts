import { Component } from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager-frontend';

  /*isLoggedIn$: Observable<boolean> | undefined;*/

  constructor(
    private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    /*this.isLoggedIn$ = this.tokenStorageService.isLoggedIn;*/
  }

  /*onLogOut(): void {
    this.tokenStorageService.logOut();
  }*/

}
