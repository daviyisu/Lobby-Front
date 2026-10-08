import { Component, inject, Input } from '@angular/core';
import { GameList } from '../../../models/GameList';
import { ImageService } from '../../../services/image.service';

/** A list shown as a 2×2 mosaic of its first covers, its name and size. */
@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  standalone: false,
})
export class ListCardComponent {
  private imageService = inject(ImageService);

  @Input({ required: true }) list!: GameList;

  /** Four mosaic slots: a cover URL, or null for an empty slot. */
  get mosaic(): (string | null)[] {
    const covers = (this.list.games ?? [])
      .filter((g) => g.coverImageId)
      .slice(0, 4)
      .map((g) => this.imageService.getIgdbImage(g.coverImageId));
    return [...covers, null, null, null, null].slice(0, 4);
  }
}
