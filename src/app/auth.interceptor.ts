import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from './services/token.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private cookieService: CookieService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.cookieService.get('user-token')) {
      req = req.clone({
        setHeaders: {
          Authorization: this.cookieService.get('user-token')
        }
      });
    }

    return next.handle(req);
  }
}
