import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { GameSearchBarComponent } from './game-search-bar/game-search-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';

// Spanish dates ("24 de febrero de 2017") for the date pipe.
registerLocaleData(localeEs);

export const globalImports = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    TopBarComponent,
    BottomNavComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    ...globalImports,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    GameSearchBarComponent,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
