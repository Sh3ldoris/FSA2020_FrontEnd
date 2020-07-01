import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {map} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
  isPasswordRight = true;
  isLoginInformationRight = true;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoginInformationRight = true;
    this.isPasswordRight = true;

    this.authService.login(this.form.value)
      .subscribe(data => {
        this.tokenService.saveToken(data.headers.get('authorization'));
        this.tokenService.saveUsername(data.headers.get('username'));
        this.tokenService.saveAuthorities(data.headers.get('role'));
        this.router.navigate(['/home']);
        this.authService.setLoggedIn(true);
      }, error => {
        if (error.status === 401) {
          this.isPasswordRight = false;
        } else if (error.status === 403) {
          this.isLoginInformationRight = false;
        }

      });
  }

}
