import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { MyListsModule } from '../my-lists.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../../testing/test-providers';

describe('ListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyListsModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
