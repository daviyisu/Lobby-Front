import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
})
export class MyGamesComponent {
  constructor(private router: Router) {}

  public tempArray = [
    'Mario Odyssey',
    'Red Dead Redemption 2',
    'Uncharted 4',
    'Starfield',
    'Starfield',
    'Starfield',
  ];

  navigateToGameDetail() {
    this.router.navigateByUrl('gamedetail');
  }
}
