import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenComponent } from './children/children.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { LoginComponent } from './login/login.component';
import { ModifyAccountComponent } from './modify-account/modify-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ChildDetailComponent },
  { path: 'children', component: ChildrenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modify', component: ModifyAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
