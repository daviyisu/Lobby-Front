import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecentGamesComponent } from './recent-games.component';

@NgModule({
  declarations: [RecentGamesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: RecentGamesComponent }]),
  ],
})
export class RecentGamesModule {}
