import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { FormControl } from '@angular/forms';
import { Game } from '../../models/game';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-search-bar',
  templateUrl: './game-search-bar.component.html',
  styleUrls: ['./game-search-bar.component.scss'],
})
export class GameSearchBarComponent implements OnInit {
  private gameService = inject(GameService);
  private translateService = inject(TranslateService);
  private router = inject(Router);

  gameSearch = new FormControl('');
  queryResults?: Game[] = [];

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

  goToGame(id: number): void {
    this.router.navigateByUrl('gamedetail/' + id);
  }

  getSearchBarPlaceholder(): string {
    return this.translateService.instant('profile.searchBarPlaceholder');
  }
}
