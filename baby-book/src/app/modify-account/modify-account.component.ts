import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
