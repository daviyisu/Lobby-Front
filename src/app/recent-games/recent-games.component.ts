import {Component, inject, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game";
import {lastValueFrom} from "rxjs";
import {ImageService} from "../../services/image.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recent-games',
  templateUrl: './recent-games.component.html',
  styleUrls: ['./recent-games.component.scss']
})
export class RecentGamesComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);
  protected imageService = inject(ImageService);
  recentGames: Game[] | undefined;
  loaders = Array(3).fill(0);

  async ngOnInit(): Promise<void> {
    this.recentGames = await lastValueFrom(this.gameService.getRecentAddedGames());
  }

  goToGame(id: number): void {
    this.router.navigateByUrl('gamedetail/' + id);
  }
}
