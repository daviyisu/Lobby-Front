import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameDetailComponent } from './game-detail.component';
import { GameDetailModule } from './game-detail.module';
import { Review } from '../../models/review';
import { User } from '../../models/user';
import { CollectionStatusEnum } from '../../models/enums';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

const review = (id: number, userId: number, rating: number) =>
  ({ id, userId, rating }) as Review;

const API = 'http://localhost:8080/';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let http: HttpTestingController;
  let params: BehaviorSubject<ParamMap>;
  let undo: (() => void) | undefined;

  /** Answers the requests that loading game `id` makes. */
  const loadGame = (id: number, status: CollectionStatusEnum) => {
    http.expectOne(`${API}game/${id}`).flush({ id, name: 'Game ' + id });
    http.expectOne(`${API}game/owns/${id}`).flush(status);
    http.match(() => true).forEach((r) => r.flush([]));
  };

  beforeEach(() => {
    params = new BehaviorSubject(convertToParamMap({ id: '1' }));
    undo = undefined;
    TestBed.configureTestingModule({
      imports: [...testImports, GameDetailModule],
      providers: [
        ...provideTestEnvironment(),
        { provide: ActivatedRoute, useValue: { paramMap: params } },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => ({
              onAction: () => ({ subscribe: (fn: () => void) => (undo = fn) }),
            }),
          },
        },
      ],
    });
    http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http.expectOne(`${API}user/current_user`).flush({ id: 3 });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('averages the ratings to one decimal', () => {
    expect(component.averageRating).toBeNull();
    component.reviews = [review(1, 2, 9), review(2, 3, 10), review(3, 4, 7)];
    expect(component.averageRating).toBe(8.7);
  });

  it("puts the viewer's own review first", () => {
    component.currentUser = new User(3, 'davidjr', '');
    component.reviews = [review(1, 2, 9), review(2, 3, 10), review(3, 4, 7)];
    expect(component.sortedReviews.map((r) => r.id)).toEqual([2, 1, 3]);
  });

  it('hides Add until the status is known', () => {
    expect(component.statusLoaded).toBeFalse();
    loadGame(1, CollectionStatusEnum.completed);
    expect(component.statusLoaded).toBeTrue();
    expect(component.owned).toBeTrue();
  });

  it('ignores a late status for a game the user already left', () => {
    http.expectOne(`${API}game/1`).flush({ id: 1, name: 'Game 1' });
    const lateStatus = http.expectOne(`${API}game/owns/1`);
    params.next(convertToParamMap({ id: '2' }));
    lateStatus.flush(CollectionStatusEnum.completed);
    expect(component.statusLoaded).toBeFalse();
    expect(component.status).toBe(CollectionStatusEnum.not_owned);
  });

  it('undoes on the game that was changed, even after navigating', () => {
    loadGame(1, CollectionStatusEnum.not_owned);
    component.addToCollection();
    http.expectOne(`${API}game/addgame`).flush(null);
    params.next(convertToParamMap({ id: '2' }));
    loadGame(2, CollectionStatusEnum.completed);

    expect(undo).toBeDefined();
    undo!();
    const req = http.expectOne(`${API}game/addgame`);
    expect(req.request.body).toEqual({
      gameId: 1,
      status: CollectionStatusEnum.not_owned,
    });
    expect(component.status).toBe(CollectionStatusEnum.completed);
  });

  it('knows whether the game is in the collection', () => {
    expect(component.owned).toBeFalse();
    component.status = CollectionStatusEnum.played;
    expect(component.owned).toBeTrue();
  });
});
