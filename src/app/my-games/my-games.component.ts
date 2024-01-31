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
    {
      name: 'Mario Odyssey',
      id: 26758,
    },
    {
      name: 'Red Dead Redemption 2',
      id: 25076,
    },
    {
      name: 'Battlefield 4',
      id: 51530,
    },
    {
      name: 'Tekken',
      id: 1242,
    },
    {
      name: "Uncharted 4: A Thief's End",
      id: 7331,
    },
    {
      name: 'Super Mario 64',
      id: 1074,
    },
    {
      name: 'The Legend of Zelda: Twilight Princess',
      id: 1036,
    },
    {
      name: 'Animal Crossing: City Folk',
      id: 2688,
    },
    {
      name: 'Final Fantasy VII',
      id: 2406,
    },
    {
      name: 'Celeste',
      id: 26226,
    },
    {
      name: 'God of War II',
      id: 117882,
    },
    {
      name: 'Hotel Dusk: Room 215',
      id: 9249,
    },
  ];

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }
}
