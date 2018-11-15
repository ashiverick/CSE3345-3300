import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  token: Token;

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
    this.authService.login(this.username, this.password)
    .pipe(first())
    .subscribe();

    if (localStorage.getItem('currentUser')) { this.router.navigate(['../dashboard']);
    } else {
      console.log(localStorage.getItem('currentUser'));
      this.alertService.error('Authentication Error! :(');
    }
  }

  public onCreateAccountClick() {
    this.userService.addAccount(this.user).subscribe( nothing => {
      this.userService.addAccount(this.user);
      this.user.post(this.user);
      this.user = {email: '', userName: '', password: '', children: []};
    });
  }
}
