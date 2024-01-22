import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListsComponent } from './my-lists.component';

describe('MyListsComponent', () => {
  let component: MyListsComponent;
  let fixture: ComponentFixture<MyListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyListsComponent],
    });
    fixture = TestBed.createComponent(MyListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
