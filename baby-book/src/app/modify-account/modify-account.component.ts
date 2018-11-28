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

  @Input()
  user: User;
  newChild;
  deletingChild: Child;
  children: Child;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private childService: ChildService
    ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  public onAddChild() {
    this.newChild = {
      parent: localStorage.getItem('userName'),
      firstName: 'string',
      lastName: 'string',
      gender: 'string',
      birthday: 'string',
      about: 'string',
      photoID: 'string'
    };

    this.userService.addChild(this.newChild).subscribe(
      (nothing) => this.getChildren(),
      (error) => console.log(error)
    );
    this.postForm.reset();
  }

  public onDeleteChild(item: any) {
    this.userService.deleteChild(item).subscribe( nothing => {
      this.userService.deleteChild(this.deletingChild);
    });
  }

  public updateAccount() {
    // figure out how to update the account information
  }

  getChildren() {
    this.childService.getChildByParent().subscribe(children => {
      this.children = children;
    });
  }

}
