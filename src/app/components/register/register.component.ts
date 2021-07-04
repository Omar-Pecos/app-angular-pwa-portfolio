import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpBody } from 'src/app/models/SignUpBody';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { NgForm } from '@angular/forms';

const formBodyDefault = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: SignUpBody;
  public error: string;
  public message: string;
  public loading: boolean = false;

  options: AnimationOptions = {
    path: '/assets/lotties/register.json',
  };

  constructor(private _router: Router, private _authService: AuthService) {
    this.user = { ...formBodyDefault };
  }

  ngOnInit(): void {}

  register(form: NgForm) {
    this.message = '';
    this.error = '';
    this.loading = true;

    this._authService.register(this.user).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.loading = false;
          this.message = 'Registered successfully!';
          form.reset();
          this.user = { ...formBodyDefault };
        }
      },
      (error) => {
        console.log(error);
        this.loading = false;
        let err = error?.error;
        this.error = err?.error || 'Internal Server Error';
      }
    );
  }

  unsetMessage = (e: Event) => {
    if (e.type === 'error') {
      this.error = '';
    } else {
      this.message = '';
    }
  };

  redirectToLogin() {
    this._router.navigateByUrl('/login');
  }
}
