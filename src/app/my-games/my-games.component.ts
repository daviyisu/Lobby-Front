import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
})
export class MyGamesComponent implements OnInit {
  private gameService = inject(GameService);
  private router = inject(Router);
  protected imageService = inject(ImageService);

  userGames: Game[] = [];

  ngOnInit() {
    this.gameService.getUserGames().subscribe((data) => {
      this.userGames = data;
    });
  }

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }
}
