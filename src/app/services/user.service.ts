import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {LikedBook} from '../models/liked-book';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'api/user/';

  constructor(private tokenService: TokenService,
              private http: HttpClient) {
  }

}
