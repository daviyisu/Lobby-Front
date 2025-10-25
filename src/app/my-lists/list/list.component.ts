import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameList} from "../../../models/GameList";
import {ListService} from "../../../services/list-service.service";
import {lastValueFrom} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {CreateListModalComponent} from "../create-list-modal/create-list-modal.component";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false
})
export class ListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private listService = inject(ListService);
  private dialogRef = inject(MatDialog);

  list!: GameList;

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.list = await lastValueFrom(this.listService.getListById(+id));
    }
  }

  async editList(): Promise<void> {
    const dialogRef = this.dialogRef.open(CreateListModalComponent, {
      data: {
        list: this.list
      }
    })
    const updatedList = await lastValueFrom(dialogRef.afterClosed()) as GameList;
    if (updatedList) {
      this.list = updatedList;
    }
  }

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }

  async addGameToList(gameToAddId: number): Promise<void> {
   this.list = await lastValueFrom(this.listService.addGameToList(this.list.id, gameToAddId));
  }
}
