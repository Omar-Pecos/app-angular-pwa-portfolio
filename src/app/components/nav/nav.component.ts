import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements DoCheck {

  public identity;

  constructor(
    private _authService : AuthService,
    private _router : Router
  ) { 
    this.identity = this._authService.getIdentity();
  }

  ngDoCheck(): void {
    this.identity = this._authService.getIdentity();
  }

  doLogout(){
    this._authService.logout();
    this.identity = this._authService.getIdentity();
    this._router.navigateByUrl('/login')
  }

}
