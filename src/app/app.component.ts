import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './services/user.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user$: Observable<User>;

  constructor(private userService: UserService) {

  }
}
