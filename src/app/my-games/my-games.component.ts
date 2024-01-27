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
    'Jak 3',
    'Cuphead',
    'Celeste',
    'Final Fantasy VII',
    'Animal Crossing: Wild World',
    'The Legend of Zelda: Ocarina of Time',
    'Battlefield 3',
    'Fallout 3',
  ];

  navigateToGameDetail() {
    this.router.navigateByUrl('gamedetail/' + 136001);
  }
}
