import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthServiceService } from '../auth-service.service';
// import { disableDebugTools } from '@angular/platform-browser';
// import { AlertComponent } from '../alert/alert.component';
// import { Alert } from '../alert';
import { AlertService } from '../alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  @Input()
  user: User;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.authService.logout();
    this.user = {email: '', userName: '', password: '', children: []};
  }

  public onLoginClick() {
    this.authService.login(this.username, this.password);
    if (localStorage.getItem('currentUser')) { this.router.navigate(['../dashboard']);

  } else {
      this.alertService.error('Authentication Error! :(');
    }
  }

  public onCreateAccountClick() {
    this.userService.addAccount(this.user).subscribe( nothing => {
      this.userService.addAccount(this.user);
      this.user.post(this.user);
      console.log(nothing);
      this.user = {email: '', userName: '', password: '', children: []};
    });
  }
}
