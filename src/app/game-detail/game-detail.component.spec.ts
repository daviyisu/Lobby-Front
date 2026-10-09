import { TestBed } from '@angular/core/testing';
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

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, GameDetailModule],
      providers: [...provideTestEnvironment()],
    });
    const fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('knows whether the game is in the collection', () => {
    expect(component.owned).toBeFalse();
    component.status = CollectionStatusEnum.played;
    expect(component.owned).toBeTrue();
  });
});
