import { TestBed } from '@angular/core/testing';
import { MyGamesComponent } from './my-games.component';
import { MyGamesModule } from './my-games.module';
import { CollectionStatusEnum } from '../../models/enums';
import { CollectionGame } from '../../models/collection-game';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

const game = (id: number, name: string, status?: CollectionStatusEnum) =>
  ({ id, name, status }) as CollectionGame;

describe('MyGamesComponent', () => {
  let component: MyGamesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyGamesModule],
      providers: [...provideTestEnvironment()],
    });
    const fixture = TestBed.createComponent(MyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters by status and counts each status', () => {
    component.userGames = [
      game(1, 'Celeste', CollectionStatusEnum.playing),
      game(2, 'Hades', CollectionStatusEnum.completed),
      game(3, 'Tunic', CollectionStatusEnum.playing),
    ];
    component.statusFilter = CollectionStatusEnum.playing;
    expect(component.visibleGames.map((g) => g.id)).toEqual([1, 3]);
    expect(component.playingCount).toBe(2);
    expect(component.countBy(CollectionStatusEnum.completed)).toBe(1);
  });

  it('ignores the status filter while the API sends no statuses', () => {
    component.userGames = [game(1, 'Celeste'), game(2, 'Hades')];
    component.statusFilter = CollectionStatusEnum.playing;
    expect(component.hasStatuses).toBeFalse();
    expect(component.visibleGames.length).toBe(2);
  });

  it('sorts A–Z without reordering the original list', () => {
    const games = [game(1, 'Tunic'), game(2, 'Celeste'), game(3, 'Hades')];
    component.userGames = games;
    component.sort = 'az';
    expect(component.visibleGames.map((g) => g.name)).toEqual([
      'Celeste',
      'Hades',
      'Tunic',
    ]);
    expect(games[0].name).toBe('Tunic');
  });
});
