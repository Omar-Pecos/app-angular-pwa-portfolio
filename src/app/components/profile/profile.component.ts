import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { SignUpBody } from 'src/app/models/SignUpBody';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

private token;
private identity;

public user : SignUpBody;
public userId : string;
public error : string;
public message : string;

  constructor(
    private location : Location,
    private _authService : AuthService,
    private _userService : UserService,
    private _router : Router
  ) { 
    this.loadCredentials();

    let data : any = this.location.getState();
    if (data._id){
      this.userId = data._id;
      this.user = {
        nickname : data.nickname,
        email : data.email,
        password : '',
        passwordConfirmation : ''
      }

      //i think is not needed but good to have anyways
      if (this.userId != this.identity._id && this.identity.role == 0){
        //an normal user get here editing other user profile!
        this._router.navigateByUrl('/home')
      }
    }   
  }

  ngOnInit(): void {
  }

  loadCredentials(){
    this.token = this._authService.getToken();
    this.identity = this._authService.getIdentity();
  }

  edit(){
    this.error = '';
    
    //call to service with id,data,token
    this._userService.editOneUser( this.userId, this.user, this.token)
      .subscribe(
        res =>{
          if (res.status == 'success'){
            
            this.message = 'User edited successfully!';
            this._authService.setIdentity(res.data);

            setTimeout(() =>{
              this._router.navigateByUrl('/home')
            }, 3000)
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
