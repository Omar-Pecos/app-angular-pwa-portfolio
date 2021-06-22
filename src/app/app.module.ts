import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { LottieModule } from 'ngx-lottie';

import { ObsWithStatusPipe } from './pipes/obs-with-status.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Sidenav } from './components/sidenav/sidenav.component';
import { Toolbar } from './components/sidenav/toolbar/toolbar.component';
import { RootComponent } from './components/root/root.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { btnCopyJSON } from './components/buttons/btn-copy-json/btn-copy-json.component';
import { btnPasteJSON } from './components/buttons/btn-paste-json/btn-paste-json.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    Sidenav,
    Toolbar,
    RootComponent,
    AddTechComponent,
    AddProfileComponent,
    AddCourseComponent,
    AddProjectComponent,
    ObsWithStatusPipe,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    ProfileComponent,
    LoaderComponent,
    AlertComponent,
    btnCopyJSON,
    btnPasteJSON,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
