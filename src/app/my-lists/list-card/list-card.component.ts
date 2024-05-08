import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {
  constructor(private router: Router) {}

  goToList() {
    this.router.navigateByUrl('list');
  }
}
