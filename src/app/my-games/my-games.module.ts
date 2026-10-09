import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyGamesComponent } from './my-games.component';

@NgModule({
  declarations: [MyGamesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: MyGamesComponent }]),
  ],
})
export class MyGamesModule {}
