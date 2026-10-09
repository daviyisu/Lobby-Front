import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GameDetailComponent } from './game-detail.component';
import { StatusSelectorComponent } from '../status-selector/status-selector.component';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { RelativeTimePipe } from '../review-card/relative-time.pipe';
import { NewReviewComponent } from '../new-review/new-review.component';
import { RatingInputComponent } from '../rating-input/rating-input.component';

/** The game page with its status selector, reviews and review dialog. */
@NgModule({
  declarations: [
    GameDetailComponent,
    StatusSelectorComponent,
    ReviewCardComponent,
    RelativeTimePipe,
    NewReviewComponent,
    RatingInputComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: GameDetailComponent }]),
  ],
})
export class GameDetailModule {}
