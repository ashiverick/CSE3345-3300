import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
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
  types;
  milestones;
  typeNum;
  mileNum;

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

  checkType() {
    this.types = this.postForm.value.type;
    if (this.types === 'Video') {
      this.typeNum = 1;
    }
    if (this.types === 'Text') {
      this.typeNum = 2;
    }
    if (this.types === 'Image') {
      this.typeNum = 3;
    }
  }
  checkMilestone() {
    this.milestones = this.postForm.value.milestone;
    if (this.milestones === 'Birthday') {
      this.mileNum = 1;
    }
    if (this.milestones === 'Crawling') {
      this.mileNum = 2;
    }
    if (this.milestones === 'First Steps') {
      this.mileNum = 3;
    }
    if (this.milestones === 'First Words') {
      this.mileNum = 4;
    }
    if (this.milestones === 'Other') {
      this.mileNum = 5;
    }
  }

  addPost() {
    this.typeNum = 0;
    this.mileNum = 0;
    this.checkType();
    this.checkMilestone();

    this.post = {
      ChildID: this.ID,
      username: localStorage.getItem('userName'),
      body: this.postForm.value.newPost,
      photoID: this.postForm.value.link,
      content: this.typeNum,
      milestone: this.mileNum
    };

    console.log(this.post);

    this.postService.addPost(this.post).subscribe(
      (response) => this.getPosts(),
      (error) => console.log(error)
    );
    this.postForm.reset();
    // window.location.reload();
  }

  deletePost(item: any) {
    this.postService.deletePost(item).subscribe(id => {
      this.getPosts();
    });
  }
}
