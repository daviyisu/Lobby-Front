import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';
import { ListService } from '../../services/list-service.service';
import { GameList } from '../../models/GameList';
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent implements OnInit {
  private dialogRef = inject(MatDialog);
  private listService = inject(ListService);
  loaders = Array(3).fill(0);

  userLists: GameList[] | undefined;

  ngOnInit() {
    this.listService.getUserLists().subscribe((result) => {
      this.userLists = result;
    })
  }

  async openCreateListModal(): Promise<void> {
    const modalRef = this.dialogRef.open(CreateListModalComponent);
    const createdList = await lastValueFrom(modalRef.afterClosed()) as GameList;
    if (createdList) {
      this.userLists = [];
      this.userLists.push(createdList)
    }
  }
}
