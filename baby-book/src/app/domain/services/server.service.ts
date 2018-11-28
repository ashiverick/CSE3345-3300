import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  protected httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  storeUser(user: any) {
    return this.http.post('http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080/signup', user, this.httpOptions);
  }
}
