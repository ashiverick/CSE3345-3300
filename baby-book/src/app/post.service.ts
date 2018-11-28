import { Injectable } from '@angular/core';
import { Post } from './post';
import { Child } from './child';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  constructor(protected httpClient: HttpClient) {}
  protected endPoint = 'http://ec2-52-15-123-114.us-east-2.compute.amazonaws.com:8080/api';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // get posts based on Child ID
  getPosts(id: any) {
    return this.httpClient.get(`${this.endPoint}/posts/` + id, this.httpOptions);
  }
  // add a post based on Child ID
  addPost(post: any) {
    return this.httpClient.post(`${this.endPoint}/addPost`, post, this.httpOptions);
  }

  // delete a post based on POST ID
  deletePost(id: any) {
    return this.httpClient.delete(`${this.endPoint}/deletePost/` + id, this.httpOptions);
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
