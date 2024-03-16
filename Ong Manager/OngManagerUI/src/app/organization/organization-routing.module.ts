import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationPage } from './organization.page';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationPage
  },
  {
    path: ':id',
    component: OrganizationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
