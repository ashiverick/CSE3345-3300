import { Component, OnInit } from '@angular/core';

import { Child } from '../child';
import { ChildService } from '../child.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  children: Child;
  childrenAr: Child[];

  constructor(private childService: ChildService) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren(): void {
    this.childService.getChildByParent().subscribe(children => this.children = children);
  }
}
