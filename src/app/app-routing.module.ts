import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyStatsComponent } from './my-stats/my-stats.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { ListComponent } from './my-lists/list/list.component';

const routes: Routes = [
  {
    path: 'mygames',
    component: MyGamesComponent,
  },
  {
    path: 'mystats',
    component: MyStatsComponent,
  },
  { path: 'mylists', component: MyListsComponent },
  {
    path: 'gamedetail',
    component: GameDetailComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
