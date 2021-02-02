import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInBody } from 'src/app/models/SignInBody';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : SignInBody
  public error : string;

  constructor(
    private _authService : AuthService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.user = {
      email : '',
      password : ''
    }
  }

  login(){
    this._authService.login(this.user)
      .subscribe(
        res =>{
          
          if (res.status = 'success'){
            let token = res.data.token;
            let identity = res.data.user;
            this._authService.setToken(token);
            this._authService.setIdentity(identity);

            this._router.navigateByUrl("/home");
          }

        },
        error =>{
          console.log(error);
          let err = error?.error;
          this.error = err?.error || 'Internal Server Error';
        }
      )
  }

}
