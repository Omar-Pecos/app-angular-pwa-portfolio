import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _authService : AuthService,
    private _router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let identity = this._authService.getIdentity();

    if (!identity){
      this._router.navigateByUrl('/home');
      return false;
    }
      
    if (identity['role'] == 1){
      return true;
    }

    this._router.navigateByUrl('/home');
    return false;
  }
  
}
