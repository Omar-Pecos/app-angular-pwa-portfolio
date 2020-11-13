import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './componets/root/root.component';
import { AddTechComponent } from './componets/add-tech/add-tech.component';

const routes: Routes = [
  {path : 'home', pathMatch : 'full', component : RootComponent},
  {path : 'add-tech', component : AddTechComponent},
  {path : '**', component : RootComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
