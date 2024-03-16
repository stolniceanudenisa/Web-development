import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationRequestPage } from './organization-request.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRequestPageRoutingModule {}
