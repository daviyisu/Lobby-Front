import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSearchBarComponent } from './game-search-bar.component';

describe('GameSearchBarComponent', () => {
  let component: GameSearchBarComponent;
  let fixture: ComponentFixture<GameSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameSearchBarComponent],
    });
    fixture = TestBed.createComponent(GameSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
