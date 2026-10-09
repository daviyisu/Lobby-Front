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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyStatsComponent } from './my-stats/my-stats.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MyListsComponent } from './my-lists/my-lists.component';
import { ListComponent } from './my-lists/list/list.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from '../services/jwt-interceptor.service';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListCardComponent } from './my-lists/list-card/list-card.component';
import { CreateListModalComponent } from './my-lists/create-list-modal/create-list-modal.component';
import { GameSearchBarComponent } from './game-search-bar/game-search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RecentGamesComponent } from './recent-games/recent-games.component';
import { SteamSyncModalComponent } from './steam-sync-modal/steam-sync-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { GameCardComponent } from './game-card/game-card.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { StatusSelectorComponent } from './status-selector/status-selector.component';
import { RatingBadgeComponent } from './rating-badge/rating-badge.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { RelativeTimePipe } from './review-card/relative-time.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AuthCardComponent } from './auth-card/auth-card.component';

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
    MyGamesComponent,
    MyStatsComponent,
    GameDetailComponent,
    NewReviewComponent,
    MyListsComponent,
    ListComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ListCardComponent,
    CreateListModalComponent,
    GameSearchBarComponent,
    FooterComponent,
    RecentGamesComponent,
    SteamSyncModalComponent,
    TopBarComponent,
    BottomNavComponent,
    GameCardComponent,
    StatusBadgeComponent,
    EmptyStateComponent,
    StatusSelectorComponent,
    RatingBadgeComponent,
    RatingInputComponent,
    ReviewCardComponent,
    RelativeTimePipe,
    ConfirmDialogComponent,
    AuthCardComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    ...globalImports,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
