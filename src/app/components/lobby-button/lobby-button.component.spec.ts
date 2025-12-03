import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyButtonComponent } from './lobby-button.component';

describe('LobbyButtonComponent', () => {
  let component: LobbyButtonComponent;
  let fixture: ComponentFixture<LobbyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
