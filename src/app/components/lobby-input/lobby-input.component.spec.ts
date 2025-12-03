import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyInputComponent } from './lobby-input.component';

describe('LobbyInputComponent', () => {
  let component: LobbyInputComponent;
  let fixture: ComponentFixture<LobbyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LobbyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
