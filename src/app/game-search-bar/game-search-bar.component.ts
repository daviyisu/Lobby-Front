import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { FormControl } from '@angular/forms';
import { Game } from '../../models/game';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game-search-bar',
  templateUrl: './game-search-bar.component.html',
  styleUrls: ['./game-search-bar.component.scss'],
})
export class GameSearchBarComponent implements OnInit {
  private gameService = inject(GameService);
  private translateService = inject(TranslateService);

  gameSearch = new FormControl('');
  queryResults?: Game[] = [];
  @Output() selectedGameId = new EventEmitter<number>();
  @Input() placeholder?: string;

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

  emitSelectedGame(id: number): void {
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
