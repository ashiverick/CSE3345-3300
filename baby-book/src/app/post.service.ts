import { Injectable } from '@angular/core';
import { Post } from './post';
import { Child } from './child';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  protected endPoint = 'http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080/api/post/';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  add(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(`${this.endPoint}/${post}`, post, this.httpOptions)
      .pipe(catchError(this.handleException));
  }
  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
