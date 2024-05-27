import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListModalComponent } from './create-list-modal.component';

describe('CreateListModalComponent', () => {
  let component: CreateListModalComponent;
  let fixture: ComponentFixture<CreateListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateListModalComponent],
    });
    fixture = TestBed.createComponent(CreateListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
