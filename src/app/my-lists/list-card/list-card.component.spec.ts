import { TestBed } from '@angular/core/testing';
import { ListCardComponent } from './list-card.component';
import { MyListsModule } from '../my-lists.module';
import { GameList } from '../../../models/GameList';
import { Game } from '../../../models/game';
import {
  provideTestEnvironment,
  testImports,
} from '../../../testing/test-providers';

describe('ListCardComponent', () => {
  let component: ListCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyListsModule],
      providers: [...provideTestEnvironment()],
    });
    const fixture = TestBed.createComponent(ListCardComponent);
    component = fixture.componentInstance;
    component.list = { id: 1, name: 'Favs', games: [] } as unknown as GameList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fills the 2×2 mosaic with covers, then empty slots', () => {
    component.list.games = [
      { id: 1, coverImageId: 'a' },
      { id: 2, coverImageId: undefined },
      { id: 3, coverImageId: 'c' },
    ] as Game[];
    const mosaic = component.mosaic;
    expect(mosaic.length).toBe(4);
    expect(mosaic.filter(Boolean).length).toBe(2);
    expect(mosaic[0] ?? '').toContain('/a.jpg');
  });

  it('counts games even when the API omits them', () => {
    (component.list as { games?: Game[] }).games = undefined;
    expect(component.gameCount).toBe(0);
  });
});
