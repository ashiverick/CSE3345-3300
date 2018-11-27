import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { Token } from './token';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  protected endPoint = 'http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(userName: string, passW: string) {
    console.log('login route');
    return this.http.post<any>(`${this.endPoint}/login`, {userName, passW})
    .pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('currentUser is: ' + localStorage.getItem('currentUser'));
        localStorage.setItem('userName', userName);
        console.log('the userName is: ' + localStorage.getItem('userName'));
      }
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  protected handleException(exception: any) {
    // tslint:disable-next-line:no-var-keyword prefer-const
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
