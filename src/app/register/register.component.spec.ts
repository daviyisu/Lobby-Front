import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthModule } from '../auth/auth.module';
import {
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, AuthModule],
      providers: [...provideTestEnvironment()],
    });
    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('flags mismatching passwords on the confirmation field', () => {
    component.registerForm.setValue({
      username: 'davidjr',
      password: 'secret1',
      confirmPassword: 'secret2',
    });
    const confirm = component.registerForm.controls.confirmPassword;
    expect(confirm.hasError('mismatch')).toBeTrue();
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('clears the mismatch once the passwords match', () => {
    component.registerForm.setValue({
      username: 'davidjr',
      password: 'secret1',
      confirmPassword: 'secret2',
    });
    component.registerForm.controls.confirmPassword.setValue('secret1');
    expect(
      component.registerForm.controls.confirmPassword.hasError('mismatch'),
    ).toBeFalse();
    expect(component.registerForm.valid).toBeTrue();
  });

  it('does not submit an invalid form', async () => {
    await component.register();
    expect(component.loading).toBeFalse();
    expect(component.registerForm.touched).toBeTrue();
  });
});
