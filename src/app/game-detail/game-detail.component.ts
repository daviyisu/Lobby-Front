import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { NewReviewComponent } from '../new-review/new-review.component';
import { AddedGameStatusModalComponent } from '../added-game-status-modal/added-game-status-modal.component';
import { GameService } from '../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { CollectionStatusEnum, genresEnum } from '../../models/enums';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  private imageService = inject(ImageService);
  private reviewService = inject(ReviewService);
  private userService = inject(UserService);

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

  /**
   * Status of the game in the current user collection
   */
  gameStatus = CollectionStatusEnum.not_owned;

  /**
   * Reviews of this game
   */
  reviews: Review[] = [];

  /**
   * Current user
   */
  currentUser!: User;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Double initialization intentionally made
      this.screenshots = [];
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
          this.gameService.getStatus(this.game.id).subscribe((response) => {
            this.gameStatus = response;
          });
          this.reviewService
            .getReviewsFromGame(this.game.id)
            .subscribe((reviews) => {
              this.reviews = reviews;
            });
        }
      });
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  openNewReviewModal(): void {
    const dialogRef = this.dialogRef.open(NewReviewComponent, {
      data: {
        gameId: this.game.id,
        gameName: this.game.name,
      },
    });
    dialogRef.afterClosed().subscribe((needRefresh) => {
      if (needRefresh) {
        this.refreshComments();
      }
    });
  }

  /**
   * Getter for genresEnum for accessing it from the template
   */
  getGenreEnum(): any {
    return genresEnum;
  }

  openAddGameModal() {
    const modalRef = this.dialogRef.open(AddedGameStatusModalComponent, {
      minWidth: '20rem',
      data: {
        gameId: this.game.id,
        currentStatus: this.gameStatus,
      },
    });
    modalRef.afterClosed().subscribe((statusSelected) => {
      if (statusSelected) {
        this.gameStatus = statusSelected;
      }
    });
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(() => {
      this.refreshComments();
    });
  }

  updateReview(review: Review): void {
    const dialogRef = this.dialogRef.open(NewReviewComponent, {
      data: {
        review: review,
        gameName: this.game.name,
      },
    });
    dialogRef.afterClosed().subscribe((needRefresh) => {
      if (needRefresh) {
        this.refreshComments();
      }
    });
  }

  refreshComments(): void {
    this.reviewService.getReviewsFromGame(this.game.id).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  protected readonly CollectionStatusEnum = CollectionStatusEnum;
}
