import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthModule } from '../auth/auth.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('LoginComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, AuthModule],
      providers: [...provideTestEnvironment()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
