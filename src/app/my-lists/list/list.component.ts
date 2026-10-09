import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { GameList } from '../../../models/GameList';
import { ListService } from '../../../services/list-service.service';
import {
  CreateListModalComponent,
  LIST_DELETED,
} from '../create-list-modal/create-list-modal.component';
import { ToastService } from '../../../services/toast.service';
import { CollectionGame } from '../../../models/collection-game';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private listService = inject(ListService);
  private dialog = inject(MatDialog);
  private toast = inject(ToastService);

  list?: GameList;
  loaders = Array(6).fill(0);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.list = undefined;
      if (id) {
        this.listService
          .getListById(+id)
          .subscribe((list) => (this.list = list));
      }
    });
  }

  get games(): CollectionGame[] {
    return this.list?.games ?? [];
  }

  async editList(): Promise<void> {
    if (!this.list) {
      return;
    }
    const ref = this.dialog.open(CreateListModalComponent, {
      data: { list: this.list },
      width: '520px',
    });
    const result = await lastValueFrom(ref.afterClosed());
    if (result === LIST_DELETED) {
      this.toast.show('lists.toast.deleted', { name: this.list.name });
      this.router.navigateByUrl('/mylists');
    } else if (result) {
      this.list = result as GameList;
      this.toast.show('lists.toast.updated');
    }
  }
}
