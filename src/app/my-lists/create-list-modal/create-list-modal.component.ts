import { Component, Inject, inject, OnInit } from '@angular/core';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListService } from '../../../services/list-service.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateListDialogInterface } from '../../../models/create-list-dialog.interface';
import { GameList } from '../../../models/GameList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
  standalone: false,
})
export class CreateListModalComponent implements OnInit {
  private gameService = inject(GameService);
  private listService = inject(ListService);
  public createListDialogRef = inject(MatDialogRef<CreateListModalComponent>);
  private router = inject(Router);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateListDialogInterface,
  ) {}

  editMode = false;
  listNameFormControl = new FormControl('', Validators.required);
  initialGamesToAdd: Game[] = [];

  ngOnInit() {
    if (this.data) {
      this.editMode = true;
      this.listNameFormControl.setValue(this.data.list.name);
      this.initialGamesToAdd = this.data.list.games;
    }
  }

  addGameToList(id: number): void {
    this.gameService
      .getGameById(id)
      .subscribe((game) => this.initialGamesToAdd.push(game));
  }

  closeModal(): void {
    this.createListDialogRef.close();
  }

  deleteList(): void {
    this.listService.deleteList(this.data.list.id).subscribe(() => {
      this.router
        .navigateByUrl('mylists')
        .then((r) => this.createListDialogRef.close());
    });
  }

  deleteGame(id: number): void {
    this.initialGamesToAdd = this.initialGamesToAdd.filter(
      (game) => game.id !== id,
    );
  }

  createList(): void {
    if (this.listNameFormControl.valid) {
      this.listService
        .createList(this.listNameFormControl.value!, this.initialGamesToAdd)
        .subscribe((createdList) => {
          this.createListDialogRef.close(createdList);
        });
    }
  }

  updateList(): void {
    if (
      this.listNameFormControl.valid &&
      this.listNameFormControl.value != null
    ) {
      const updatedList = new GameList(
        this.data.list.id,
        this.listNameFormControl.value,
        this.data.list.user,
        this.initialGamesToAdd,
      );

      this.listService
        .updateList(this.data.list.id, updatedList)
        .subscribe((updatedList) => {
          this.createListDialogRef.close(updatedList);
        });
    }
  }
}
