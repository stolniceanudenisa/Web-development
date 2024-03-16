import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { adminGuard } from '../core/guards/admin.guard';
import { NoRoleGuard } from '../core/guards/no-role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'district',
        loadChildren: () => import('./../district/district.module').then((m) => m.DistrictModule),
        canActivate: [adminGuard]
      },
      {
        path: 'organization-request',
        loadChildren: () =>
          import('./../organization-request/organization-request.module').then((m) => m.OrganizationRequestPageModule),
        canActivate: [adminGuard]
      },
      {
        path: 'organization',
        loadChildren: () => import('./../organization/organization.module').then((m) => m.OrganizationModule),
        canActivate: [adminGuard]
      },
      {
        path: 'organization-details',
        loadChildren: () => import('./../organization/organization.module').then((m) => m.OrganizationModule),
        canActivate: [NoRoleGuard]
      },
      {
        path: 'member-organization-details',
        loadChildren: () => import('./../organization/organization.module').then((m) => m.OrganizationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
