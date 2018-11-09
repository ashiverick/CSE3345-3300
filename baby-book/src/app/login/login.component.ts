import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  user: User;

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  public onLoginClick() {
    this.router.navigate(['../dashboard']);
  }

}
