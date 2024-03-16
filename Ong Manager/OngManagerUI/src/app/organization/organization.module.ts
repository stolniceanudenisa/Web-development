import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationService } from './services/organization.service';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationPage } from './organization.page';
import { MembersListComponent } from './components/members-list/members-list.component';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { OrganizationRegistrationRequestModalComponent } from '../organization-request/components/organization-registration-request-modal/organization-registration-request-modal.component';
import { OrganizationRequestService } from '../organization-request/services/organization-request.service';
import { OrganizationRequestDetailsComponent } from './components/organization-request-details/organization-request-details.component';
import { OrganizationModalComponent } from './components/organization-modal/organization-modal.component';

@NgModule({
  declarations: [
    OrganizationListComponent,
    MembersListComponent,
    OrganizationDetailsComponent,
    OrganizationRegistrationRequestModalComponent,
    OrganizationRequestDetailsComponent,
    OrganizationModalComponent,
    OrganizationPage
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    OrganizationListComponent,
    MembersListComponent,
    OrganizationDetailsComponent,
    OrganizationRegistrationRequestModalComponent,
    OrganizationRequestDetailsComponent,
    OrganizationModalComponent,
    OrganizationPage
  ],
  providers: [OrganizationService, OrganizationRequestService]
})
export class OrganizationModule {}
