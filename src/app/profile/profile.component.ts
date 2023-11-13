import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser?: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      let userId = params['id'];
      sessionStorage.setItem('userId', userId);
      this.userService.getUser(params['id']).subscribe( (response) => {
        this.currentUser = response;
      });
    });

  }

}
