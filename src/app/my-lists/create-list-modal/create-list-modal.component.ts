import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game.service';
import { ListService } from '../../../services/list-service.service';
import { CreateListDialogInterface } from '../../../models/create-list-dialog.interface';
import { GameList } from '../../../models/GameList';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../confirm-dialog/confirm-dialog.component';

/** Dialog result when the list was deleted from the edit dialog. */
export const LIST_DELETED = 'deleted';

@Component({
  selector: 'app-create-list-modal',
  templateUrl: './create-list-modal.component.html',
  styleUrls: ['./create-list-modal.component.scss'],
  standalone: false,
})
export class CreateListModalComponent implements OnInit {
  private gameService = inject(GameService);
  private listService = inject(ListService);
  private dialog = inject(MatDialog);
  private translate = inject(TranslateService);
  private dialogRef = inject(MatDialogRef<CreateListModalComponent>);
  data = inject<CreateListDialogInterface | null>(MAT_DIALOG_DATA, {
    optional: true,
  });

  editMode = false;
  saving = false;
  saveError = false;
  listNameFormControl = new FormControl('', [
    Validators.required,
    // At least one visible character: the name is saved trimmed.
    Validators.pattern(/\S/),
    Validators.maxLength(60),
  ]);
  games: Game[] = [];

  ngOnInit() {
    if (this.data?.list) {
      this.editMode = true;
      this.listNameFormControl.setValue(this.data.list.name);
      this.games = [...(this.data.list.games ?? [])];
    }
  }

  get canSave(): boolean {
    return this.listNameFormControl.valid && this.games.length > 0;
  }

  addGame(id: number): void {
    if (this.games.some((g) => g.id === id)) {
      return;
    }
    this.gameService
      .getGameById(id)
      .subscribe((game) => (this.games = [...this.games, game]));
  }

  removeGame(id: number): void {
    this.games = this.games.filter((game) => game.id !== id);
  }

  close(): void {
    this.dialogRef.close();
  }

  async save(): Promise<void> {
    if (this.saving) {
      return;
    }
    if (!this.canSave) {
      this.listNameFormControl.markAsTouched();
      return;
    }
    const name = this.listNameFormControl.value!.trim();
    this.saving = true;
    this.saveError = false;
    try {
      const list = await lastValueFrom(
        this.editMode && this.data
          ? this.listService.updateList(
              this.data.list.id,
              new GameList(
                this.data.list.id,
                name,
                this.data.list.user,
                this.games,
              ),
            )
          : this.listService.createList(name, this.games),
      );
      this.dialogRef.close(list);
    } catch {
      this.saveError = true;
    } finally {
      this.saving = false;
    }
  }

  async deleteList(): Promise<void> {
    if (!this.data) {
      return;
    }
    const confirmRef = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmDialogData
    >(ConfirmDialogComponent, {
      width: '440px',
      data: {
        title: this.translate.instant('lists.delete.title', {
          name: this.data.list.name,
        }),
        text: this.translate.instant('lists.delete.text'),
        confirm: this.translate.instant('list.deleteList'),
      },
    });
    if (!(await lastValueFrom(confirmRef.afterClosed()))) {
      return;
    }
    try {
      await lastValueFrom(this.listService.deleteList(this.data.list.id));
      this.dialogRef.close(LIST_DELETED);
    } catch {
      this.saveError = true;
    }
  }
}
