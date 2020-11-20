import { Injectable, Injector } from '@angular/core';
import { Profile } from '../models/Profile';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<Profile> {

  constructor(
    protected injector : Injector
  ) { 
    super(injector,'Profile',environment.APIurl + '/api/profile');
  }
}
