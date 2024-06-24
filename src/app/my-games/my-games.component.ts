import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import {ImageService} from "../../services/image.service";
import {startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
})
export class MyGamesComponent {
  private gameService = inject(GameService);
  private router = inject(Router);
  protected imageService = inject(ImageService);

  loaders = Array(5).fill(0);

  userGames$ = this.gameService.userGames$.pipe(
    startWith(null),
    switchMap(() => this.gameService.getUserGames())
  )

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }
}
