import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Child } from '../child';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  post: Post;
  child: Child;

  constructor(public postService: PostService) { }

  ngOnInit() {
  }

  addPost() {
    this.postService.add(this.post).subscribe( nothing => {
      this.post.date = new Date();
      console.log(nothing);
      this.child.posts.push(this.post);
      this.postService.add(this.post);
      this.post = {};
    });
  }

}
