import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewComponent } from '../new-review/new-review.component';
import { AddedGameStatusModalComponent } from '../added-game-status-modal/added-game-status-modal.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  constructor(
    private dialogRef: MatDialog,
    private gameService: GameService,
    private imageService: ImageService,
    private route: ActivatedRoute,
  ) {}

  /**
   * Current game
   */
  game!: Game;

  /**
   * Game screenshots
   */
  screenshots?: Image[];

  /**
   * Game cover
   */
  coverId?: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gameService.getGameById(params['id']).subscribe((data) => {
        this.game = data;
        if (this.game.id) {
          this.imageService
            .getScreenshotsByGame(this.game.id)
            .subscribe((screenshots) => {
              this.screenshots = screenshots.slice(0, 6); //This should be made directly on back-end
            });
          this.imageService.getGameCover(this.game.id).subscribe((cover) => {
            this.coverId = cover.imageId;
          });
        }
      });
    });
  }

  openNewReviewModal() {
    this.dialogRef.open(NewReviewComponent, {});
  }

  /**
   * Method to build the IGDB image with the image id
   */
  getIgdbImage(imageId: string): string {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`;
  }

  openAddGameModal() {
    this.dialogRef.open(AddedGameStatusModalComponent, {
      minWidth: '20rem',
    });
  }
}
