import { Injectable,Injector } from '@angular/core';
import { Course } from '../models/Course';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

  constructor(
    protected injector : Injector
  ) { 
    super(injector,'Course', environment.APIurl + '/api/courses')
  }
}
