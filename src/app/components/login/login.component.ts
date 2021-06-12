import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInBody } from 'src/app/models/SignInBody';
import { AuthService } from '../../services/auth.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: SignInBody;
  public error: string;
  public loading: boolean;

  options: AnimationOptions = {
    path: '/assets/lotties/login.json',
  };

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.user = {
      email: '',
      password: '',
    };
  }

  unsetMessage = (e: Event) => {
    if (e.type === 'error') {
      this.error = '';
    }
  };

  login() {
    this.loading = true;
    this._authService.login(this.user).subscribe(
      (res) => {
        if ((res.status = 'success')) {
          this.loading = false;
          const token = res.data.token;
          const identity = res.data.user;
          this._authService.setToken(token);
          this._authService.setIdentity(identity);

          this._router.navigateByUrl('/home');
        }
      },
      (error) => {
        console.log(error);
        this.loading = false;
        const err = error?.error;
        this.error = err?.error || 'Internal Server Error';
      }
    );
  }
}
