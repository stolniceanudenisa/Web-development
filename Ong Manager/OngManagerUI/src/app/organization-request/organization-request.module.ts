import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrganizationRequestPageRoutingModule } from './organization-request-routing.module';
import { OrganizationRequestPage } from './organization-request.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { OrganizationRequestService } from './services/organization-request.service';
import { OrganizationRequestsListComponent } from './components/organization-requests-list/organization-requests-list.component';
import { DistrictModule } from '../district/district.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrganizationRequestPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    DistrictModule
  ],
  declarations: [OrganizationRequestsListComponent, OrganizationRequestPage],
  providers: [OrganizationRequestService]
})
export class OrganizationRequestPageModule {}
