import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { ImageService } from '../../services/image.service';
import { startWith, switchMap } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
  imports: [NgIf, NgFor, NgxSkeletonLoaderModule, TranslateModule],
  standalone: true,
})
export class MyGamesComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);
  protected imageService = inject(ImageService);

  loaders = Array(5).fill(0);

  userGames: Game[] | undefined;

  ngOnInit(): void {
    this.gameService.userGames$
      .pipe(
        startWith(null),
        switchMap(() => this.gameService.getUserGames()),
      )
      .subscribe((games) => {
        this.userGames = games;
      });
  }

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }
}
