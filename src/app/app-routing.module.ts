import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyStatsComponent } from './my-stats/my-stats.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'mygames', component: MyGamesComponent },
      { path: 'mystats', component: MyStatsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
