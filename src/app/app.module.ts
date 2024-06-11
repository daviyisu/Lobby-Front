import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MyGamesComponent } from './my-games/my-games.component';
import { MyStatsComponent } from './my-stats/my-stats.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NewReviewComponent } from './new-review/new-review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AddedGameStatusModalComponent } from './added-game-status-modal/added-game-status-modal.component';
import { MatListModule } from '@angular/material/list';
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
    ProfileComponent,
    MyGamesComponent,
    MyStatsComponent,
    GameDetailComponent,
    NewReviewComponent,
    AddedGameStatusModalComponent,
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
  ],
  imports: [
    ...globalImports,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
