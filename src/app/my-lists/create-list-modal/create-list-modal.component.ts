import {Component, inject} from '@angular/core';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game.service';
import { MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
})
export class CreateListModalComponent {
  private gameService = inject(GameService);

  initialGamesToAdd: Game[] = [];

  constructor(
    public createListDialogRef: MatDialogRef<CreateListModalComponent>
  ) {
  }

  addGameToList(id: number): void {
    this.gameService
      .getGameById(id)
      .subscribe((game) => this.initialGamesToAdd.push(game));
  }

  closeModal(): void {
    this.createListDialogRef.close();
    //
  }
}
