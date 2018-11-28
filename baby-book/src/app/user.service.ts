import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { Child } from './child';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected endPoint = 'http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080/api';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected httpClient: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.httpClient
      .get<User>(`${this.endPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getAll(): Observable<User []> {
    return this.httpClient
      .get<User []>(`${this.endPoint}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  addChild(child: any): Observable<Child> {
    return this.httpClient
      .post<Child>(`${this.endPoint}/addChild`, child, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteChild(id: any): Observable<Child> {
    return this.httpClient
      .delete<Child>(`${this.endPoint}/deleteChild/` + id, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  updatePassword(user: any, data: any): Observable<User> {
    return this.httpClient
    .put<User>(`${this.endPoint}/updatePassword/` + user, data, this.httpOptions);
  }

  protected handleException(exception: any) {
    // tslint:disable-next-line:no-var-keyword prefer-const
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    // alert('Password updated');
    return Observable.throw(exception);
  }
}

