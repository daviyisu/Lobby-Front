import { Component, inject, Input } from '@angular/core';
import { CollectionGame } from '../../models/collection-game';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  standalone: false,
})
export class GameCardComponent {
  protected imageService = inject(ImageService);

  @Input({ required: true }) game!: CollectionGame;
}
