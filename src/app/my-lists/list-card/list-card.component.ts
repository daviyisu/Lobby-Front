import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import {GameListDTO} from "../../../models/GameList";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {

  @Input() list!: GameListDTO;

  constructor(private router: Router) {}

  goToList() {
    this.router.navigateByUrl('list');
  }
}
