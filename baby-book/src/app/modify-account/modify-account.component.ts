import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Child } from '../child';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modify-account',
  templateUrl: './modify-account.component.html',
  styleUrls: ['./modify-account.component.css']
})
export class ModifyAccountComponent implements OnInit {

  @Input()
  user: User;
  newChild: Child;
  deletingChild: Child;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  public onAddChild() {
    this.userService.addChild(this.newChild).subscribe( nothing => {
      this.userService.addChild(this.newChild);
      console.log(nothing);
      this.newChild.birthday = new Date();
      this.newChild = {id: 0, firstName: '', lastName: '', gender: '', profilePicture: ''};
    });
  }

  public onDeleteChild() {
    this.userService.deleteChild(this.deletingChild).subscribe( nothing => {
      this.userService.deleteChild(this.deletingChild);
      console.log(nothing);
      this.deletingChild.birthday = new Date();
      this.deletingChild = {id: 0, firstName: '', lastName: '', gender: '', profilePicture: ''};
    });
  }

  public updateAccount() {
    // figure out how to update the account information
  }

}
