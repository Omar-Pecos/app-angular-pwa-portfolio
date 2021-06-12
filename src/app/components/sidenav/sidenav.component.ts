import { Component, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'Sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class Sidenav implements DoCheck {
  public identity;
  @Input() drawer;

  constructor(private _authService: AuthService, private _router: Router) {
    this.identity = this._authService.getIdentity();
  }

  ngDoCheck(): void {
    this.identity = this._authService.getIdentity();
  }

  closeDrawer = () => {
    this.drawer.toggle();
  };

  doLogout() {
    this._authService.logout();
    this.identity = this._authService.getIdentity();
    this._router.navigateByUrl('/login');
  }
}
