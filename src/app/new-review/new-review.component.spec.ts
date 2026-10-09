import { TestBed } from '@angular/core/testing';
import { NewReviewComponent } from './new-review.component';
import { GameDetailModule } from '../game-detail/game-detail.module';
import {
  provideDialog,
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('NewReviewComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, GameDetailModule],
      providers: [
        ...provideTestEnvironment(),
        ...provideDialog({ gameId: 1, gameName: 'Celeste' }),
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewReviewComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
