import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('FooterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports],
      declarations: [FooterComponent],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
