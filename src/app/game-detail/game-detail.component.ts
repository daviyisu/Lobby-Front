import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewComponent } from '../new-review/new-review.component';
import { AddedGameStatusModalComponent } from '../added-game-status-modal/added-game-status-modal.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { genresEnum } from '../../models/enums';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  private imageService = inject(ImageService);

  constructor(
    private dialogRef: MatDialog,
    private gameService: GameService,
    private route: ActivatedRoute,
  ) {}

  /**
   * Current game
   */
  game!: Game;

  /**
   * Game screenshots
   */
  screenshots: string[] = [];

  /**
   * Game platforms
   */
  platforms?: string[];

  /**
   * Game cover
   */
  cover?: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gameService.getGameById(params['id']).subscribe((data) => {
        this.game = data;
        if (this.game.id) {
          this.imageService
            .getScreenshotsByGame(this.game.id)
            .subscribe((screenshots) => {
              screenshots.slice(0, 6).forEach((screenshot) => {
                this.screenshots.push(
                  this.imageService.getIgdbImage(screenshot.imageId),
                );
              });
            });
          this.cover = this.imageService.getIgdbImage(this.game.coverImageId);
          this.gameService
            .getPlatformsFromGame(this.game.id)
            .subscribe((response) => {
              this.platforms = response;
            });
        }
      });
    });
  }

  openNewReviewModal() {
    this.dialogRef.open(NewReviewComponent, {});
  }

  /**
   * Getter for genresEnum for accessing it form HTML
   */
  getGenreEnum(): any {
    return genresEnum;
  }

  openAddGameModal() {
    this.dialogRef.open(AddedGameStatusModalComponent, {
      minWidth: '20rem',
    });
  }
}
