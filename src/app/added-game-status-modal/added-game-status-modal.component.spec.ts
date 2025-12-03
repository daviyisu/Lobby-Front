import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedGameStatusModalComponent } from './added-game-status-modal.component';

describe('AddedGameStatusModalComponent', () => {
  let component: AddedGameStatusModalComponent;
  let fixture: ComponentFixture<AddedGameStatusModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AddedGameStatusModalComponent],
});
    fixture = TestBed.createComponent(AddedGameStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
