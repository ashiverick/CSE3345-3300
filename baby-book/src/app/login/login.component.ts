import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthServiceService } from '../auth-service.service';
import { Token } from '../token';
// import { disableDebugTools } from '@angular/platform-browser';
// import { AlertComponent } from '../alert/alert.component';
// import { Alert } from '../alert';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ServerService } from '../domain/services/server.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
@ViewChild('f') signupForm: NgForm;

  username: string;
  password: string;
  token: Token;
  user;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private alertService: AlertService,
    private userService: UserService,
    private serverService: ServerService
  ) { }

  addUser(form: NgForm) {
    this.loading = true;
    this.user = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      email: this.signupForm.value.email
    };
    console.log(this.user);

    this.serverService.storeUser(this.user).subscribe( temp => {
      console.log(this.user);
    });
  }

  public onLoginClick() {
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../dashboard']);
        },
        error => {
          console.log(localStorage.getItem('currentUser'));
          this.alertService.error('Authentication Error! :(');
        }
      );
  }

  public onLogoutClick() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');
      // tslint:disable-next-line:prefer-const no-var-keyword
      this.alertService.success('You have successfully logged out!');
    } else {
      this.alertService.info('No profile is currently signed in!');
    }
  }
  ngOnInit() {
    this.authService.logout();
  }
}
