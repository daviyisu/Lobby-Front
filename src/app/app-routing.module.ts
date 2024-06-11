import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyStatsComponent } from './my-stats/my-stats.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { ListComponent } from './my-lists/list/list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from '../services/auth.guard';
import { RegisterComponent } from './register/register.component';
import {RecentGamesComponent} from "./recent-games/recent-games.component";

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
        component: MyGamesComponent,
      },
      {
        path: 'mystats',
        component: MyStatsComponent,
      },
      {
        path: 'mylists',
        component: MyListsComponent,
      },
      {
        path: 'gamedetail/:id',
        component: GameDetailComponent,
      },
      {
        path: 'list/:id',
        component: ListComponent,
      },
      {
        path: 'recent',
        component: RecentGamesComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
