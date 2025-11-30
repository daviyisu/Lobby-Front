import { Component, Inject } from '@angular/core';
import { CollectionStatusEnum } from '../../models/enums';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameDialogInterface } from '../../models/game-dialog.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-added-game-status-modal',
  templateUrl: './added-game-status-modal.component.html',
  styleUrls: ['./added-game-status-modal.component.scss'],
  standalone: false,
})
export class AddedGameStatusModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GameDialogInterface,
    private gameService: GameService,
    private dialogRef: MatDialogRef<AddedGameStatusModalComponent>,
  ) {}
  addGame(status: CollectionStatusEnum): void {
    if (status == this.data.currentStatus) {
      status = CollectionStatusEnum.not_owned;
      this.gameService.addGame(status, this.data.gameId).subscribe();
    } else {
      this.gameService.addGame(status, this.data.gameId).subscribe();
    }
    this.dialogRef.close(status);
  }

  protected readonly CollectionStatusEnum = CollectionStatusEnum;
}
