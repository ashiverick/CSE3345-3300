import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Child } from './child';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  protected endPoint = 'http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080/api/children/[{email}]';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected httpClient: HttpClient) { }

  getChildById(id: number): Observable<Child> {
    return this.httpClient
      .get<Child>(`${this.endPoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getAllChildren(): Observable<Child []> {
    return this.httpClient
      .get<Child []>(`${this.endPoint}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    // tslint:disable-next-line:no-var-keyword prefer-const
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
