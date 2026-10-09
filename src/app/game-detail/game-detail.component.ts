import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Game } from '../../models/game';
import { NewReviewComponent } from '../new-review/new-review.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../confirm-dialog/confirm-dialog.component';
import { GameService } from '../../services/game.service';
import { ImageService } from '../../services/image.service';
import { CollectionStatusEnum, genresEnum } from '../../models/enums';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ListService } from '../../services/list-service.service';
import { GameList } from '../../models/GameList';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  standalone: false,
})
export class GameDetailComponent implements OnInit {
  protected imageService = inject(ImageService);
  private reviewService = inject(ReviewService);
  private userService = inject(UserService);
  private listService = inject(ListService);
  private gameService = inject(GameService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private toast = inject(ToastService);
  protected translate = inject(TranslateService);

  game?: Game;
  cover?: string;
  /** IGDB image ids of the first screenshots. */
  screenshots: string[] = [];
  platforms: string[] = [];

  /** Id of the game on screen; responses for any other id are dropped. */
  private gameId?: number;

  /** Status of the game in the current user's collection. */
  status = CollectionStatusEnum.not_owned;
  /** False until the status is known, so "Add" can't overwrite it. */
  statusLoaded = false;
  savingStatus = false;

  reviews: Review[] = [];
  currentUser?: User;

  /** The user's lists, loaded when the "Add to a list" menu opens. */
  lists?: GameList[];

  protected readonly CollectionStatusEnum = CollectionStatusEnum;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        tap((id) => this.reset(id)),
        // Cancels the previous game's request when the id changes.
        switchMap((id) => this.gameService.getGameById(id)),
      )
      .subscribe((game) => {
        this.game = game;
        this.cover = this.imageService.getIgdbImage(game.coverImageId);
        // Set by reset() before the request that brought this game.
        const id = this.gameId as number;
        // Late answers for a game we already left are ignored.
        this.imageService.getScreenshotsByGame(id).subscribe((shots) => {
          if (id === this.gameId) {
            this.screenshots = shots.slice(0, 6).map((s) => s.imageId);
          }
        });
        this.gameService.getPlatformsFromGame(id).subscribe((platforms) => {
          if (id === this.gameId) {
            this.platforms = platforms ?? [];
          }
        });
        this.gameService.getStatus(id).subscribe((status) => {
          if (id === this.gameId) {
            this.status = status;
            this.statusLoaded = true;
          }
        });
        this.refreshReviews();
      });
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.currentUser = user));
  }

  private reset(id: number): void {
    this.gameId = id;
    this.game = undefined;
    this.screenshots = [];
    this.platforms = [];
    this.reviews = [];
    this.lists = undefined;
    this.status = CollectionStatusEnum.not_owned;
    this.statusLoaded = false;
    this.savingStatus = false;
  }

  get genres(): string[] {
    const known = genresEnum as Record<number, string>;
    return (this.game?.genres ?? [])
      .filter((g) => known[g])
      .map((g) => 'genres.' + g);
  }

  get owned(): boolean {
    return this.status !== CollectionStatusEnum.not_owned;
  }

  get ownReview(): Review | undefined {
    return this.reviews.find((r) => r.userId == this.currentUser?.id);
  }

  /** The viewer's review first, then everyone else's. */
  get sortedReviews(): Review[] {
    const own = this.ownReview;
    return own ? [own, ...this.reviews.filter((r) => r !== own)] : this.reviews;
  }

  get averageRating(): number | null {
    if (!this.reviews.length) {
      return null;
    }
    const sum = this.reviews.reduce((acc, r) => acc + Number(r.rating), 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  back(): void {
    // Only go back when the previous page was inside Lobby.
    if (this.router.lastSuccessfulNavigation?.previousNavigation) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/mygames');
    }
  }

  addToCollection(): void {
    this.changeStatus(CollectionStatusEnum.playing);
  }

  removeFromCollection(): void {
    this.changeStatus(CollectionStatusEnum.not_owned);
  }

  /**
   * Saves the new status straight away and offers Undo, instead of asking
   * for confirmation. The game id is captured so that Undo, or a late
   * response, always applies to the game that was changed.
   */
  changeStatus(
    next: CollectionStatusEnum,
    offerUndo = true,
    gameId = this.gameId,
  ): void {
    if (gameId === undefined || (gameId === this.gameId && this.savingStatus)) {
      return;
    }
    const onScreen = () => gameId === this.gameId;
    const previous = onScreen() ? this.status : undefined;
    if (onScreen()) {
      this.status = next;
      this.savingStatus = true;
    }
    this.gameService.addGame(next, gameId).subscribe({
      next: () => {
        if (onScreen()) {
          this.savingStatus = false;
        }
        this.gameService.setUserGames();
        if (!offerUndo || previous === undefined) {
          return;
        }
        const undo = () => this.changeStatus(previous, false, gameId);
        if (next === CollectionStatusEnum.not_owned) {
          this.toast.show('gameDetail.toast.removed', undefined, undo);
        } else if (previous === CollectionStatusEnum.not_owned) {
          this.toast.show('gameDetail.toast.added', undefined, undo);
        } else {
          this.toast.show(
            'gameDetail.toast.moved',
            { status: this.translate.instant('gameStatus.' + next) },
            undo,
          );
        }
      },
      error: () => {
        if (onScreen()) {
          this.savingStatus = false;
          if (previous !== undefined) {
            this.status = previous;
          }
        }
        this.toast.show('global.error');
      },
    });
  }

  loadLists(): void {
    if (!this.lists) {
      this.listService
        .getUserLists()
        .subscribe((lists) => (this.lists = lists));
    }
  }

  addToList(list: GameList): void {
    if (!this.game) {
      return;
    }
    this.listService.addGameToList(list.id, this.game.id).subscribe({
      next: () =>
        this.toast.show('gameDetail.toast.addedToList', { list: list.name }),
      error: () => this.toast.show('global.error'),
    });
  }

  goToLists(): void {
    this.router.navigateByUrl('/mylists');
  }

  async openReview(review?: Review): Promise<void> {
    if (!this.game) {
      return;
    }
    const ref = this.dialog.open(NewReviewComponent, {
      data: { gameId: this.game.id, gameName: this.game.name, review },
      width: '560px',
      autoFocus: 'first-tabbable',
    });
    if (await lastValueFrom(ref.afterClosed())) {
      this.refreshReviews();
      this.toast.show(
        review
          ? 'gameDetail.toast.reviewUpdated'
          : 'gameDetail.toast.reviewPublished',
      );
    }
  }

  async deleteReview(review: Review): Promise<void> {
    const ref = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(
      ConfirmDialogComponent,
      {
        data: {
          title: this.translate.instant('gameDetail.deleteReview.title'),
          text: this.translate.instant('gameDetail.deleteReview.text'),
          confirm: this.translate.instant('gameDetail.deleteReview.confirm'),
        },
        width: '440px',
      },
    );
    if (!(await lastValueFrom(ref.afterClosed()))) {
      return;
    }
    this.reviewService.deleteReview(review.id).subscribe({
      next: () => {
        this.refreshReviews();
        this.toast.show('gameDetail.toast.reviewDeleted');
      },
      error: () => this.toast.show('global.error'),
    });
  }

  private refreshReviews(): void {
    const id = this.gameId;
    if (id === undefined) {
      return;
    }
    this.reviewService.getReviewsFromGame(id).subscribe((reviews) => {
      if (id === this.gameId) {
        this.reviews = reviews;
      }
    });
  }
}
