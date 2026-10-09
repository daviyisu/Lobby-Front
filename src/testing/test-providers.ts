import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

/** Translations without a loader: templates render the keys. */
export const testImports = [TranslateModule.forRoot()];

/** HTTP (backed by HttpTestingController), router and no-op animations. */
export function provideTestEnvironment(): (Provider | EnvironmentProviders)[] {
  return [
    provideHttpClient(),
    provideHttpClientTesting(),
    provideRouter([]),
    provideNoopAnimations(),
  ];
}

/** For components opened as dialogs. */
export function provideDialog(data: unknown = null): Provider[] {
  return [
    { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
    { provide: MAT_DIALOG_DATA, useValue: data },
  ];
}
