import { TestBed } from '@angular/core/testing';
import { RecentGamesComponent } from './recent-games.component';
import { RecentGamesModule } from './recent-games.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('RecentGamesComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, RecentGamesModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecentGamesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
