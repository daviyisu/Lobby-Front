import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../../services/game.service';
import { ReviewService } from '../../services/review.service';
import { CollectionStatusEnum } from '../../models/enums';
import { STATUS_META } from '../../models/collection-game';

interface StatusCount {
  status: CollectionStatusEnum;
  key: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-my-stats',
  templateUrl: './my-stats.component.html',
  styleUrls: ['./my-stats.component.scss'],
  standalone: false,
})
export class MyStatsComponent implements OnInit {
  private gameService = inject(GameService);
  private reviewService = inject(ReviewService);
  private translate = inject(TranslateService);

  collectionCount?: number;
  reviewCount?: number;
  byStatus?: StatusCount[];

  ngOnInit() {
    this.gameService
      .getCountUserGames()
      .subscribe((count) => (this.collectionCount = count));
    this.reviewService
      .countReviews()
      .subscribe((count) => (this.reviewCount = count));
    forkJoin(
      STATUS_META.map((m) =>
        this.gameService.getCountCollectionByStatus(m.status),
      ),
    ).subscribe((counts) => {
      this.byStatus = STATUS_META.map((m, i) => ({ ...m, count: counts[i] }));
    });
  }

  count(status: string): number | undefined {
    return this.byStatus?.find((s) => s.status === status)?.count;
  }

  /** Games that have a status; the breakdown bar is relative to this. */
  get statusTotal(): number {
    return this.byStatus?.reduce((sum, s) => sum + s.count, 0) ?? 0;
  }

  get completedShare(): number | null {
    const completed = this.count(CollectionStatusEnum.completed);
    if (completed === undefined || !this.collectionCount) {
      return null;
    }
    return Math.round((completed / this.collectionCount) * 100);
  }

  get barLabel(): string {
    return (this.byStatus ?? [])
      .map(
        (s) => `${this.translate.instant('gameStatus.' + s.status)} ${s.count}`,
      )
      .join(', ');
  }

  protected readonly Status = CollectionStatusEnum;
}
