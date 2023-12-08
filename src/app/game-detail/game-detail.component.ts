import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent {
  /**
   * Current game
   */
  game!: Game;
}
