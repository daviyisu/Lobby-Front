import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesComponent } from './my-games.component';

describe('MyGamesComponent', () => {
  let component: MyGamesComponent;
  let fixture: ComponentFixture<MyGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyGamesComponent],
    });
    fixture = TestBed.createComponent(MyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
