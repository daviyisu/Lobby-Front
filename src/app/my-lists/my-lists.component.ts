import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
})
export class MyListsComponent {
  constructor(private router: Router) {}

  goToList() {
    this.router.navigateByUrl('list');
  }
}
