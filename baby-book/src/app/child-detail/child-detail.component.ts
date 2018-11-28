import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChildrenComponent } from '../children/children.component';
import { ChildService } from '../child.service';
import { Child } from '../child';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.css']
})
export class ChildDetailComponent implements OnInit {
  children: Child;
  childComponent: ChildrenComponent;
  ID: number;

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ID = params.id;
    });
    console.log(this.ID);
    this.initChildren();
  }
  initChildren(): void {
    this.childService.getChildByParent().subscribe(children => {
      this.children = children;
      // console.log(children);
      // console.log(this.children);
      // console.log(Object.keys(this.children).length);
      for (let i = 0; i < Object.keys(this.children).length; i ++) {
        this.children[i].id = children[i].ChildID;
        this.children[i].firstName = children[i].firstName;
        this.children[i].lastName = children[i].lastName;
        this.children[i].gender = children[i].gender;
        this.children[i].birthday = children[i].birthday;
        this.children[i].profilePicture = children[i].photoID;
      }
    });

  }

  goBack(): void {
    this.location.back();
  }
}
