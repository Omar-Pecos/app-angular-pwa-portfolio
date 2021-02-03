import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AuthService} from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService : AuthService,
    private _router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean  {
    
    return this._authService.isAuthenticated().pipe(map((response : {authenticated : boolean}) => {
        
        if (response.authenticated) {
            return true;
        }
        this._router.navigate(['/login']);
        this._authService.logout();
        return false;
    }), catchError((error) => {
        let token = this._authService.getToken();
        if (!navigator.onLine && token){
          //the validation failed but a token exists and the navigator is offline so I asumme the user is logged with no connection
          return of(true);
        }
      
        this._router.navigate(['/login']);
        // Of takes a value and wraps that value in an observable
        return of(false);
    }));
  }
  
}
