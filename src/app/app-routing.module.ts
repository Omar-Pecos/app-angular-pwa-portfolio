import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path : 'home', 
    pathMatch : 'full', 
    component : RootComponent ,
    canActivate: [ AuthGuard ]
  },
  {
    path : 'add-tech', 
    component : AddTechComponent,
    canActivate: [ AuthGuard,AdminGuard ]
  },
  {
    path : 'add-profile', 
    component : AddProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path : 'add-course', 
    component : AddCourseComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path : 'add-project', 
    component : AddProjectComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path : 'login', 
    component : LoginComponent,
  },
  {
    path : 'register', 
    component : RegisterComponent,
  },
  {
    path : 'users', 
    component : UsersComponent,
    canActivate: [ AuthGuard, AdminGuard ]
  },
  {
    path : 'profile', 
    component : ProfileComponent,
    canActivate : [ AuthGuard ]
  },
  {
    path : '**',
    redirectTo : 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [ AuthGuard,AdminGuard ]
})
export class AppRoutingModule { }
