import { Component, inject } from '@angular/core';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ListService } from '../../../services/list-service.service';

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent {
  private gameService = inject(GameService);
  private listService = inject(ListService);

  initialGamesToAdd: Game[] = [];

  constructor(
    public createListDialogRef: MatDialogRef<CreateListModalComponent>,
  ) {}

  addGameToList(id: number): void {
    this.gameService
      .getGameById(id)
      .subscribe((game) => this.initialGamesToAdd.push(game));
  }

  closeModal(): void {
    this.createListDialogRef.close();
  }

  createList(): void {
    this.listService
      .createList(
        'Temporal',
        this.initialGamesToAdd.map((game) => game.id),
      )
      .subscribe();
  }
}
