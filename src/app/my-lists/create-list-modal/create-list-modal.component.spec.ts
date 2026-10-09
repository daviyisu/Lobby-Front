import { TestBed } from '@angular/core/testing';
import { CreateListModalComponent } from './create-list-modal.component';
import { MyListsModule } from '../my-lists.module';
import {
  provideDialog,
  provideTestEnvironment,
  testImports,
} from '../../../testing/test-providers';

describe('CreateListModalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyListsModule],
      providers: [...provideTestEnvironment(), ...provideDialog()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CreateListModalComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
