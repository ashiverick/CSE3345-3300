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
      this.newChild.birthday = new Date();
      this.newChild = {id: 0, firstName: '', lastName: '', gender: '', profilePicture: '', posts: []};
    });
  }

  public onDeleteChild() {
    // figure out how to delete a child from an account
  }

  public updateAccount() {
    // figure out how to update the account information
  }

}
