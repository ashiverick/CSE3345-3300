import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { PostComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ModifyAccountComponent } from './modify-account/modify-account.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildrenComponent,
    ChildDetailComponent,
    PostComponent,
    DashboardComponent,
    LoginComponent,
    ModifyAccountComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
