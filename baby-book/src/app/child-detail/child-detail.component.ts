import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChildService } from '../child.service';
import { Child } from '../child';

@Component({
  selector: 'app-child-detail',
  templateUrl: './child-detail.component.html',
  styleUrls: ['./child-detail.component.css']
})
export class ChildDetailComponent implements OnInit {
  child: Child;

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getChild();
  }

  getChild(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.childService.getChildById(id).subscribe(child => this.child = child);
  }

  goBack(): void {
    this.location.back();
  }

}
