import { Injectable, Injector } from '@angular/core';
import { Project } from '../models/Project';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService  extends BaseService<Project>{

  constructor(
    protected injector : Injector
  ) { 
    super(injector, 'Project', environment.APIurl + '/api/projects')
  }
}
