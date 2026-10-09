import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { ShellService } from '../../services/shell.service';

@Component({
  selector: 'app-recent-games',
  templateUrl: './recent-games.component.html',
  styleUrls: ['./recent-games.component.scss'],
  standalone: false,
})
export class RecentGamesComponent implements OnInit {
  private gameService = inject(GameService);
  protected shell = inject(ShellService);

  recentGames: Game[] | undefined;
  loaders = Array(6).fill(0);
  failed = false;

  ngOnInit(): void {
    this.gameService.getRecentAddedGames().subscribe({
      next: (games) => (this.recentGames = games),
      error: () => {
        this.recentGames = [];
        this.failed = true;
      },
    });
  }
}
