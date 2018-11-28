import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildrenComponent } from './children/children.component';
import { ChildDetailComponent } from './child-detail/child-detail.component';
import { PostComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ModifyAccountComponent } from './modify-account/modify-account.component';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor } from './domain/helpers/jwt.interceptor';
import { ChildService } from './child.service';
import { PostService } from './post.service';
import { UserService } from './user.service';
import { AlertService } from './alert.service';
import { AuthServiceService } from './auth-service.service';

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
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ChildService,
    PostService,
    UserService,
    AlertService,
    AuthServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
