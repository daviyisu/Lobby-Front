import { TestBed } from '@angular/core/testing';
import { GameSearchBarComponent } from './game-search-bar.component';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('GameSearchBarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, GameSearchBarComponent],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GameSearchBarComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
