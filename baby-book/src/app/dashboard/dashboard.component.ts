import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Child } from '../child';
import { ChildService } from '../child.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  children: Child[] = [];

  constructor(private childService: ChildService, private router: Router) { }

  ngOnInit() {
    this.getChildren();
  }

  getChildren(): void {
    this.childService.getAllChildren()
      .subscribe(children => this.children = children.slice(1, 5));
  }

  public onChildClick() {
    this.router.navigate(['../children']);
  }
}
