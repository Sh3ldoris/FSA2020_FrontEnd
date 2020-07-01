import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {RegisterInfo} from '../../auth/register-info';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  form: FormGroup;
  registerInfo: RegisterInfo;
  isUserNameTaken = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isUserNameTaken = false;

    this.registerInfo = new RegisterInfo(
      this.form.get('username').value,
      this.form.get('password').value);

    this.authService.register(this.registerInfo).subscribe(
      () => {
        this.router.navigate(['/signin']);
      },
        err => {
            if (err.status === 406) {
              this.isUserNameTaken = true;
            }
        });
  }

}
