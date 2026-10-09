import { TestBed } from '@angular/core/testing';
import { MyStatsComponent } from './my-stats.component';
import { MyStatsModule } from './my-stats.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('MyStatsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, MyStatsModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MyStatsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
