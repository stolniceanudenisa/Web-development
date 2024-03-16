import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistrictPage } from './district.page';
import { DistrictListComponent } from './components/district-list/district-list.component';

const routes: Routes = [{ path: '', component: DistrictPage }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule {}
