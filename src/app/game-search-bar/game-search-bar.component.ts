import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { FormControl } from '@angular/forms';
import { Game } from '../../models/game';
import { TranslateService } from '@ngx-translate/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-game-search-bar',
  templateUrl: './game-search-bar.component.html',
  styleUrls: ['./game-search-bar.component.scss'],
  standalone: false,
})
export class GameSearchBarComponent implements OnInit {
  private gameService = inject(GameService);
  private translateService = inject(TranslateService);
  protected imageService = inject(ImageService);

  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;

  gameSearch = new FormControl('');
  queryResults?: Game[] = [];
  @Output() selectedGameId = new EventEmitter<number>();
  @Input() placeholder?: string;
  /** Shows the Ctrl K hint (used by the top bar). */
  @Input() showShortcut = false;

  ngOnInit() {
    this.gameSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.gameService.searchGamesByName(value || '')),
      )
      .subscribe(
        (result) => {
          this.queryResults = result;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  focus(): void {
    this.input?.nativeElement.focus();
  }

  emitSelectedGame(id: number): void {
    this.gameSearch.reset();
    this.selectedGameId.emit(id);
  }

  getSearchBarPlaceholder(): string {
    let result = 'profile.searchBarPlaceholder';
    if (this.placeholder) {
      result = this.placeholder;
    }
    return this.translateService.instant(result);
  }
}
