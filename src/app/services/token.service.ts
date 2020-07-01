import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from 'angular-2-local-storage';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

const TOKEN_KEY = 'user-token';
const USERNAME_KEY = 'user-name';
const AUTHORITIES_KEY = 'user-authorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private roles: Array<string> = [];

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private cookieService: CookieService) {
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }

  public saveToken(token: string) {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookieService.get(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    this.cookieService.delete(USERNAME_KEY);
    this.cookieService.set(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return this.cookieService.get(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string) {
    this.cookieService.delete(AUTHORITIES_KEY);
    this.cookieService.set(AUTHORITIES_KEY, authorities);
  }

  public getAuthority(): string {
    return this.cookieService.get(AUTHORITIES_KEY);
  }

}
