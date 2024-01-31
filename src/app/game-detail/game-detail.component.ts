import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewComponent } from '../new-review/new-review.component';
import { AddedGameStatusModalComponent } from '../added-game-status-modal/added-game-status-modal.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ScreenshotService } from '../../services/screenshot.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  constructor(
    private dialogRef: MatDialog,
    private gameService: GameService,
    private screenshotService: ScreenshotService,
    private route: ActivatedRoute,
  ) {}

  /**
   * Current game
   */
  game!: Game;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gameService.getGameById(params['id']).subscribe((data) => {
        this.game = data;
        if (this.game.id) {
          this.screenshotService
            .getScreenshotsByGame(this.game.id)
            .subscribe((data) => {
              console.log(data);
            });
        }

        console.log(this.game);
      });
    });
  }

  openNewReviewModal() {
    this.dialogRef.open(NewReviewComponent, {});
  }

  openAddGameModal() {
    this.dialogRef.open(AddedGameStatusModalComponent, {
      minWidth: '20rem',
    });
  }
}
