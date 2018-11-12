import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthServiceService } from '../auth-service.service';
import { disableDebugTools } from '@angular/platform-browser';
import { AlertComponent } from '../alert/alert.component';
import { Alert } from '../alert';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  @Input()
  user: User;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private alertService: AlertService ) { }

  ngOnInit() {
    this.authService.logout();
  }

  public onLoginClick() {
    this.authService.login(this.username, this.password);
    if (localStorage.getItem('currentUser')) { this.router.navigate(['../dashboard']);

  } else {
      this.alertService.error('Authentication Error! :(');
    }
  }

}
