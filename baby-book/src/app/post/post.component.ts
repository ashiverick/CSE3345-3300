import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';

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
    public router: Router,
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
  getPosts() {
    this.postService.getPosts(this.ID).subscribe(posts => {
      this.posts = posts;
      for (let i = 0; i < Object.keys(this.posts).length; i++) {
        this.posts[i].id = posts[i].PostID;
        this.posts[i].date = posts[i].postdate;
        this.posts[i].photo = posts[i].photoID;
      }
      console.log(this.posts);
    });
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

    // this doesn't work
    this.router.navigateByUrl('/detail/' + this.ID);
    window.location.reload();
  }

  deletePost(item: any) {
    this.postService.deletePost(item).subscribe(id => {
      this.getPosts();
    });
    this.router.navigateByUrl('/detail/' + this.ID);
    window.location.reload();
  }
}
