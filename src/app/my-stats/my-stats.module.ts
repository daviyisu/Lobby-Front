import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyStatsComponent } from './my-stats.component';

@NgModule({
  declarations: [MyStatsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: MyStatsComponent }]),
  ],
})
export class MyStatsModule {}
