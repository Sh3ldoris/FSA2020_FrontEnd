import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {observable, Observable, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {RegisterInfo} from './register-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;
  private loginURL = '/login';
  private registerUrl = '/api/register';

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  isUserLoggedIn() {
    const user = this.cookieService.get('user-name');
    return !(user === '');
  }

  isUserAdmin() {
    const role = this.cookieService.get('user-authorities');
    return (role === 'ADMIN');
  }

  login(user: User) {
    return this.http.post<any>(this.loginURL, user, {observe: 'response'});
  }

  register(info: RegisterInfo) {
    return this.http.post(this.registerUrl, info, {observe: 'response'});
  }

}
