import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { LottieModule } from 'ngx-lottie';

import { ObsWithStatusPipe } from './pipes/obs-with-status.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { RootComponent } from './components/root/root.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RootComponent,
    AddTechComponent,
    AddProfileComponent,
    AddCourseComponent,
    AddProjectComponent,
    ObsWithStatusPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
