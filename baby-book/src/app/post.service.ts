import { Injectable } from '@angular/core';
import { Post } from './post';
import { Child } from './child';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'ashiverick'
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  add(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(`${this.endpoint}/${child.id}`, post, this.httpOptions)
      .pipe(catchError(this.handleException));
  }
}
