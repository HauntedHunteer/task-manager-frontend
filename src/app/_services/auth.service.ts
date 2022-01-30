import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";

import { environment } from "../../environments/environment";
import {AuthRequest} from "../_models/auth-request";
import {AuthResponse} from "../_models/auth-response";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.API_URL + '/api/authenticate/login', authRequest, httpOptions);
  }

  register(authRequest: AuthRequest): Observable<any> {
    return this.httpClient.post<AuthRequest>(environment.API_URL + '/api/authenticate/register', authRequest, httpOptions);
  }
}
