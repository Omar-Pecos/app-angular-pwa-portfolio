import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';

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
    canActivate: [ AuthGuard ]
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
    path : '**',
    redirectTo : 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [ AuthGuard ]
})
export class AppRoutingModule { }
