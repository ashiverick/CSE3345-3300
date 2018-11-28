import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Child } from '../child';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnDestroy {

  @ViewChild ('f') postForm: NgForm;
  post;
  posts: Post;
  ID: number;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ID = params.id;
    });
    this.getPosts();
  }
  ngOnDestroy() {
    console.log('destroyed');
  }

  getPosts() {
    this.postService.getPosts(this.ID).subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }

  addPost() {
    this.post = {
      ChildID: this.ID,
      username: localStorage.getItem('userName'),
      body: 'form data',
      likes: 'likes',
      photoID: 'string',
      content: 'enum',
      milestone: 'enum'
    };

    this.postService.addPost(this.post).subscribe(
      (response) => this.getPosts(),
      (error) => console.log(error)
    );
    this.postForm.reset();
  }

  deletePost(item: any) {
    this.postService.deletePost(item).subscribe(id => {
      this.getPosts();
    });
  }
}
