import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CollectionStatusEnum } from '../../models/enums';
import { ReviewService } from '../../services/review.service';

@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    standalone: false
})
export class MyStatsComponent implements OnInit {
  private gameService = inject(GameService);
  private reviewService = inject(ReviewService);

  collectionCount?: number;

  countDroppedGames?: number;

  countCompletedGames?: number;

  countPlayingGames?: number;

  countTotalReviews?: number;

  ngOnInit() {
    this.gameService
      .getCountUserGames()
      .subscribe((count) => (this.collectionCount = count));
    this.gameService
      .getCountCollectionByStatus(CollectionStatusEnum.abandoned)
      .subscribe((count) => (this.countDroppedGames = count));
    this.gameService
      .getCountCollectionByStatus(CollectionStatusEnum.completed)
      .subscribe((count) => (this.countCompletedGames = count));
    this.gameService
      .getCountCollectionByStatus(CollectionStatusEnum.playing)
      .subscribe((count) => (this.countPlayingGames = count));
    this.reviewService
      .countReviews()
      .subscribe((count) => (this.countTotalReviews = count));
  }
}
