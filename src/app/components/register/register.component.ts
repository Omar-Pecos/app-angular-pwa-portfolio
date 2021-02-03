import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpBody } from 'src/app/models/SignUpBody';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user : SignUpBody;
  public error : string;
  public message : string;

  constructor(
    private _router : Router,
    private _authService : AuthService
  ) { 
    this.user = {
      nickname : '',
      email : '',
      password : '',
      passwordConfirmation : ''
    }
  }

  ngOnInit(): void {
  }

  register(){
    this.message = '';
    this.error = '';
    
    this._authService.register( this.user )
        .subscribe(
          res =>{
              if (res.status == 'success'){
                this.message = 'Registered successfully!';
              }
          },
          error =>{
            console.log(error);
            let err = error?.error;
            this.error = err?.error || 'Internal Server Error';
          }
        )
  }

  redirectToLogin(){
    this._router.navigateByUrl('/login');
  }

}
