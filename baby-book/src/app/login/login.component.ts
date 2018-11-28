import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthServiceService } from '../auth-service.service';
import { Token } from '../token';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { ServerService } from '../domain/services/server.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

    this.serverService.storeUser(this.user).subscribe(
    temp => {
      console.log(this.user);
    },
    data => {
      this.router.navigate(['../login']);
      window.location.reload();
    }
    );

    console.log('user created');

    // DOESNT CLOSE MODAL JUST REFRESHES PAGE
    // this.router.navigateByUrl('/login');
    // window.location.reload();
  }

  public onLoginClick() {
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../dashboard']);
          window.location.reload();
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
