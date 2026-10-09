import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../services/auth.guard';

/** Every section is a lazy chunk, loaded when its route is first visited. */
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/mygames',
      },
      {
        path: 'mygames',
        loadChildren: () =>
          import('./my-games/my-games.module').then((m) => m.MyGamesModule),
      },
      {
        path: 'mystats',
        loadChildren: () =>
          import('./my-stats/my-stats.module').then((m) => m.MyStatsModule),
      },
      {
        path: 'gamedetail/:id',
        loadChildren: () =>
          import('./game-detail/game-detail.module').then(
            (m) => m.GameDetailModule,
          ),
      },
      {
        path: 'recent',
        loadChildren: () =>
          import('./recent-games/recent-games.module').then(
            (m) => m.RecentGamesModule,
          ),
      },
      {
        // "mylists" and "mylists/:id".
        path: 'mylists',
        loadChildren: () =>
          import('./my-lists/my-lists.module').then((m) => m.MyListsModule),
      },
      {
        // Old list URLs keep working.
        path: 'list/:id',
        redirectTo: '/mylists/:id',
      },
    ],
  },
  {
    // Declares "login" and "register".
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
