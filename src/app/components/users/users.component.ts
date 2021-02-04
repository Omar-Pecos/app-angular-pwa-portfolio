import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private token;
  public identity;

  public users = null;
  public error =  '';
  public message = '';

  constructor(
    private _userService : UserService,
    private _authService : AuthService
  ) { 
    this.token = this._authService.getToken();
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.error = '';
    
    this._userService.getAllUsers( this.token )
      .subscribe(
        res =>{
          if (res.status == 'success'){
            this.users = res.data;
          }
        },
        error =>{
          console.log(error);
          let err = error?.error;
          this.error = err?.error || 'Internal Server Error';
        }
      )
  }

  grantOrRevoke(id : string,body: object, pos : number){
    this.error = '';

    this._userService.grantOrRevoke(id,body,this.token)
      .subscribe(
        res =>{
          if (res.status == 'success'){
            this.message = 'Updated user privileges!';
            this.users[pos] = res.data;
            setTimeout(() => this.message = '',2000);
          }
        },
        error =>{
          console.log(error);
          let err = error?.error;
          this.error = err?.error || 'Internal Server Error';
        }
      )
  }
  grantUser(id : string,pos : number){
    console.log(id + ' ' + pos);
    
    let body = {
      admin : true
    }

    this.grantOrRevoke(id,body,pos);
  }

  revokeUser(id : string, pos : number){
    let body = {
      admin : false
    }

    this.grantOrRevoke(id,body,pos);
  }


  seeDeleteConfirmation(user : any, pos : number){
    Swal.fire({
      title: 'Are you sure?',
      text: "The user '" + user.nickname + "' will be erased",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#D9D9D9',
      confirmButtonText: 'Delete'
    })
      .then((result) => {
        if (result.isConfirmed) {

          //call to delete
          this.deleteUser(user._id, pos);

        }
      });
  }

  deleteUser(id : string, pos : number){
    this._userService.deleteUser(id, this.token)
      .subscribe(
        res =>{
          if (res.status == 'success'){
            this.message = 'Deleted user successfully!';

            this.users.splice(pos,1)
            setTimeout(() => this.message = '',2000);
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
