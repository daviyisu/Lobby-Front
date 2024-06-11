import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGamesComponent } from './recent-games.component';

describe('RecentGamesComponent', () => {
  let component: RecentGamesComponent;
  let fixture: ComponentFixture<RecentGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentGamesComponent]
    });
    fixture = TestBed.createComponent(RecentGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
