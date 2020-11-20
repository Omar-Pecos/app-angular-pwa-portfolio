import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';

const routes: Routes = [
  {path : 'home', pathMatch : 'full', component : RootComponent},
  {path : 'add-tech', component : AddTechComponent},
  {path : 'add-profile', component : AddProfileComponent},
  {path : '**', component : RootComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
