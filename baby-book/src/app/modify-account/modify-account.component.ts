import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Child } from '../child';
import { User } from '../user';
import { UserService } from '../user.service';
import { ChildService } from '../child.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponent implements OnInit {
  @ViewChild ('f') postForm: NgForm;
  @ViewChild ('g') childForm: NgForm;
  @ViewChild ('d') deleteForm: NgForm;

  @Input()
  user: User;
  newChild;
  deletingChild;
  children: Child;
  data;
  ID: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private childService: ChildService
    ) { }

  ngOnInit() {
    this.getChildren();
  }

  goBack(): void {
    this.location.back();
  }

  public onAddChild() {
    this.newChild = {
      parent: localStorage.getItem('userName'),
      firstName: this.childForm.value.firstname,
      lastName: this.childForm.value.lastname,
      gender: this.childForm.value.gender,
      birthday: this.childForm.value.birthday,
      about: this.childForm.value.about,
      photoID: this.childForm.value.photo
    };

    console.log(this.newChild);

    this.userService.addChild(this.newChild).subscribe(
      (response) => this.router.navigateByUrl('/dashboard'),
      (error) => this.router.navigateByUrl('/dashboard')
    );
    this.childForm.reset();
    console.log('child added');

    // still need this to close a modal
    // this.router.navigateByUrl('/dashboard');
    window.location.reload();
  }

  public onCancelClick() {
    this.postForm.reset();
  }

  public onDeleteChild(item: any) {
    this.deletingChild = this.deleteForm.value.deletelist;
    console.log(this.deletingChild);
    for (let i = 0; i < Object.keys(this.children).length; i ++) {
      if (this.children[i].firstName === this.deletingChild) {
         this.ID = this.children[i].id;
      }
    }
    console.log(this.ID);
    this.userService.deleteChild(this.ID).subscribe(
      (response) => this.router.navigateByUrl('/dashboard'),
      (error) => this.router.navigateByUrl('/dashboard')
    );
    this.deleteForm.reset();
    console.log('child deleted');

    // still need this to close a modal
    // this.router.navigateByUrl('/dashboard');
    window.location.reload();
  }

  public updateAccount(form: NgForm) {
    this.data = {
      password: this.postForm.value.password
    };
    this.userService.updatePassword(localStorage.getItem('userName'), this.data).subscribe(
      (response) => this.router.navigateByUrl('/dashboard'),
      (error) => this.router.navigateByUrl('/dashboard')
    );
    this.postForm.reset();
    console.log('password updated');
  }

  getChildren() {
    this.childService.getChildByParent().subscribe(children => {
      this.children = children;
      for (let i = 0; i < Object.keys(this.children).length; i ++) {
        this.children[i].id = children[i].ChildID;
      }
    });
  }
}
