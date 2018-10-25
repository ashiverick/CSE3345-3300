import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Child } from './child';
import { CHILDREN } from './mock-children';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private postService: PostService) { }

  getChildren(): Observable<Child[]> {
    this.postService.add('ChildService: fetched children');
    return of(CHILDREN);
  }

  getChild(id: number): Observable<Child> {
    this.postService.add(`ChildService: fetched child id=${id}`);
    return of(CHILDREN.find(child => child.id === id));
  }
}
