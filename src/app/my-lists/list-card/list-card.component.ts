import {Component, inject, Input} from '@angular/core';
import { Router } from '@angular/router';
import { GameList } from "../../../models/GameList";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent {

  private router = inject(Router);
  private imageService = inject(ImageService);

  private placeholderImage = 'assets/img/gamelist_placeholder.png'

  @Input() list!: GameList;

  getImagesFrontView(): string[] {
    let images: string[] = []
    this.list.games.slice(0,5).forEach((game) => {
      if (game.coverImageId) {
        images.push(this.imageService.getIgdbImage(game.coverImageId))
      }
    })
    while (images.length < 5) {
      images.push(this.placeholderImage);
    }
    return images;
  }

  goToList(id: number) {
    this.router.navigate(['/list', id]);
  }
}
