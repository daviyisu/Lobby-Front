import { Component, inject } from '@angular/core';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent {
  private gameService = inject(GameService);

  initialGamesToAdd: Game[] = [];

  addGameToList(id: number): void {
    this.gameService
      .getGameById(id)
      .subscribe((game) => this.initialGamesToAdd.push(game));
  }
}
