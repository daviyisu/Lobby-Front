import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';
import { ListService } from '../../services/list-service.service';
import { GameList } from '../../models/GameList';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  standalone: false,
})
export class MyListsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private listService = inject(ListService);
  private toast = inject(ToastService);

  loaders = Array(4).fill(0);
  userLists: GameList[] | undefined;

  ngOnInit() {
    this.listService.getUserLists().subscribe((lists) => {
      this.userLists = lists;
    });
  }

  async openCreateListModal(): Promise<void> {
    const ref = this.dialog.open(CreateListModalComponent, { width: '520px' });
    const created = await lastValueFrom(ref.afterClosed());
    if (created instanceof Object && 'id' in created) {
      this.userLists = [...(this.userLists ?? []), created as GameList];
      this.toast.show('lists.toast.created', { name: created.name });
    }
  }
}
