import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, switchMap } from 'rxjs';
import { GameService } from '../../services/game.service';
import { ShellService } from '../../services/shell.service';
import { CollectionStatusEnum } from '../../models/enums';
import { CollectionGame, STATUS_META } from '../../models/collection-game';

type SortMode = 'recent' | 'az';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
  standalone: false,
})
export class MyGamesComponent implements OnInit {
  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected shell = inject(ShellService);

  loaders = Array(6).fill(0);
  statusMeta = STATUS_META;

  userGames: CollectionGame[] | undefined;
  statusFilter: CollectionStatusEnum | null = null;
  sort: SortMode = 'recent';

  ngOnInit(): void {
    this.gameService.userGames$
      .pipe(
        startWith(null),
        switchMap(() => this.gameService.getUserGames()),
      )
      .subscribe((games) => {
        this.userGames = games;
      });

    this.route.queryParamMap.subscribe((params) => {
      const status = params.get('status') as CollectionStatusEnum | null;
      this.statusFilter = STATUS_META.some((m) => m.status === status)
        ? status
        : null;
      this.sort = params.get('sort') === 'az' ? 'az' : 'recent';
    });
  }

  /** Statuses only show once the collection endpoint returns them. */
  get hasStatuses(): boolean {
    return !!this.userGames?.some((g) => g.status);
  }

  get playingCount(): number {
    return this.countBy(CollectionStatusEnum.playing);
  }

  countBy(status: CollectionStatusEnum): number {
    return this.userGames?.filter((g) => g.status === status).length ?? 0;
  }

  get visibleGames(): CollectionGame[] {
    let games = this.userGames ?? [];
    if (this.statusFilter) {
      games = games.filter((g) => g.status === this.statusFilter);
    }
    if (this.sort === 'az') {
      games = [...games].sort((a, b) => a.name.localeCompare(b.name));
    }
    return games;
  }

  setFilter(status: CollectionStatusEnum | null): void {
    this.updateQuery({ status });
  }

  setSort(sort: SortMode): void {
    this.updateQuery({ sort: sort === 'recent' ? null : sort });
  }

  private updateQuery(queryParams: Record<string, string | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
