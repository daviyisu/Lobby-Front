import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { AppModule } from '../app.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('MainComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, AppModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
