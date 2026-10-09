import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { GameCardComponent } from '../game-card/game-card.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  MatButtonModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
];

const COMPONENTS = [
  GameCardComponent,
  StatusBadgeComponent,
  RatingBadgeComponent,
  EmptyStateComponent,
  ConfirmDialogComponent,
];

/**
 * Pieces shared by the lazily loaded sections. The app shell does not import
 * it, so the form fields and dialogs it brings stay out of the initial bundle.
 */
@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
