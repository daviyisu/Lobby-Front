import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewComponent } from '../new-review/new-review.component';

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

  constructor(private dialogRef: MatDialog) {}

  openNewReviewModal() {
    this.dialogRef.open(NewReviewComponent, {});
  }
}
