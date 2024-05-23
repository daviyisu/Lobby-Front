import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameList} from "../../../models/GameList";
import {ListService} from "../../../services/list-service.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private listService = inject(ListService);

  list!: GameList;

  async ngOnInit(): Promise<void> {
    //TODO PROBLEMA CON ESTO AL AÑADIR JUEGO Y RECARGAR
    if (history.state.list) {
      this.list = history.state.list as GameList;
    } else {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.list = await lastValueFrom(this.listService.getListById(+id));
      }
    }
  }

  navigateToGameDetail(id: number) {
    this.router.navigateByUrl('gamedetail/' + id);
  }

  async addGameToList(gameToAddId: number): Promise<void> {
   this.list = await lastValueFrom(this.listService.addGameToList(this.list.id, gameToAddId));
  }
}
