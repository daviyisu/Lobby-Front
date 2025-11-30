import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamSyncModalComponent } from './steam-sync-modal.component';

describe('SteamSyncModalComponent', () => {
  let component: SteamSyncModalComponent;
  let fixture: ComponentFixture<SteamSyncModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SteamSyncModalComponent],
    });
    fixture = TestBed.createComponent(SteamSyncModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
