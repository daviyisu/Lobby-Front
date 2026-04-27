import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbySelectComponent } from './lobby-select.component';

describe('LobbySelectComponent', () => {
  let component: LobbySelectComponent;
  let fixture: ComponentFixture<LobbySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbySelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LobbySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
