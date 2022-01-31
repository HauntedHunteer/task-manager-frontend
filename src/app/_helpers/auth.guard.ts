import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {TokenStorageService} from "../_services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isloggedIn: boolean = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isloggedIn = !!this.tokenStorageService.getToken()
    console.log("guard" + this.isloggedIn);
    if (this.isloggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
    /*return this.tokenStorageService.isLoggedIn
      .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn){
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
  );*/
  }

}
