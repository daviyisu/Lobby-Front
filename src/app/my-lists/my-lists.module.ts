import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GameSearchBarComponent } from '../game-search-bar/game-search-bar.component';
import { MyListsComponent } from './my-lists.component';
import { ListComponent } from './list/list.component';
import { ListCardComponent } from './list-card/list-card.component';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';

/** Lists: the lists page ("mylists") and a single list ("list/:id"). */
@NgModule({
  declarations: [
    MyListsComponent,
    ListComponent,
    ListCardComponent,
    CreateListModalComponent,
  ],
  imports: [
    SharedModule,
    GameSearchBarComponent,
    RouterModule.forChild([
      { path: 'mylists', component: MyListsComponent },
      { path: 'list/:id', component: ListComponent },
    ]),
  ],
})
export class MyListsModule {}
