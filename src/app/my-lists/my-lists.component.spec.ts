import { TestBed } from '@angular/core/testing';
import { MyListsComponent } from './my-lists.component';
import { MyListsModule } from './my-lists.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('MyListsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyListsModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyListsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
