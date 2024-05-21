import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';
import { ListService } from '../../services/list-service.service';
import { GameListDTO } from '../../models/GameList';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent implements OnInit {
  private dialogRef = inject(MatDialog);
  private listService = inject(ListService);

  userLists: GameListDTO[] = [];

  ngOnInit() {
    this.listService.getUserLists().subscribe((result) => {
      this.userLists = result;
    })
  }

  openCreateListModal(): void {
    this.dialogRef.open(CreateListModalComponent);
  }
}
