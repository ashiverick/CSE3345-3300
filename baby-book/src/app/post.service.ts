import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: string[] = [];

  add(post: string) {
    this.posts.push(post);
  }

  clear() {
    this.posts = [];
  }
}
