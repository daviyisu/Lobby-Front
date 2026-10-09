import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { provideTestEnvironment } from '../testing/test-providers';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('applies a theme to the document', () => {
    TestBed.createComponent(AppComponent);
    expect(['light', 'dark']).toContain(
      document.documentElement.getAttribute('data-theme') ?? '',
    );
  });
});
