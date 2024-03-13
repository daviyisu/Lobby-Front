import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GameService } from '../../services/game.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public currentUser?: User;
  private loginService = inject(LoginService);
  private router = inject(Router);

  /**
   * Links of the tabs
   */
  links = [
    {
      label: 'profile.collection',
      route: 'mygames',
    },
    {
      label: 'profile.statistics',
      route: 'mystats',
    },
    {
      label: 'profile.lists',
      route: 'mylists',
    },
  ];

  constructor(
    private userService: UserService,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   let userId = params['id'];
    //   sessionStorage.setItem('userId', userId);
    //   this.userService.getUser(params['id']).subscribe((response) => {
    //     this.currentUser = response;
    //   });
    // });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

  ngAfterViewInit() {
    // const element = document.getElementById('tab-mygames');
    // if (element) {
    //   element.click();
    // }
  }
}
