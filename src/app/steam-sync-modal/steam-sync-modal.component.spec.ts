import { TestBed } from '@angular/core/testing';
import { SteamSyncModalComponent } from './steam-sync-modal.component';
import {
  provideDialog,
  provideTestEnvironment,
  testImports,
} from '../../testing/test-providers';

describe('SteamSyncModalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...testImports, SteamSyncModalComponent],
      providers: [...provideTestEnvironment(), ...provideDialog()],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SteamSyncModalComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
