
import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Tech } from '../models/Tech';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechService extends BaseService<Tech> {

  constructor(
    protected injector : Injector
  ) { 
      super( injector, 'Tech' ,  environment.APIurl + '/api/techs' )
   }


}
