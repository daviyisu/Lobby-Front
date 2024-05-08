import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent {
  private dialogRef = inject(MatDialog);

  openCreateListModal(): void {
    this.dialogRef.open(CreateListModalComponent);
  }
}
