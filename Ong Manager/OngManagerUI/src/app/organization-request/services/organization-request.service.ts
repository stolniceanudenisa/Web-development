import { Injectable } from '@angular/core';
import { OrganizationRegistrationRequestControllerService } from '../../api/services/organization-registration-request-controller.service';
import { Pageable } from '../../api/models/pageable';
import { Observable, of } from 'rxjs';
import { PageOrganizationRegistrationRequest } from '../../api/models/page-organization-registration-request';
import { OrganizationControllerService } from '../../api/services/organization-controller.service';
import { OrganizationRegistration } from '../../api/models/organization-registration';
import { Organization } from '../../api/models/organization';
import { OrganizationRegistrationRequest } from '../../api/models/organization-registration-request';
import { OrganizationRegistrationRequestData } from '../../api/models/organization-registration-request-data';

@Injectable()
export class OrganizationRequestService {
  constructor(
    private organizationRegistrationRequestControllerService: OrganizationRegistrationRequestControllerService,
    private organizationControllerService: OrganizationControllerService
  ) {}

  public fetchOrganizationRegistrationRequestList(pageable: Pageable): Observable<PageOrganizationRegistrationRequest> {
    return this.organizationRegistrationRequestControllerService.fetchOrganizationList({ pageable });
  }

  public deleteOrganizationRegistrationRequest(id: number): Observable<void> {
    return this.organizationRegistrationRequestControllerService.deleteOrganizationRegistrationRequestById({ id });
  }

  public createOrganization(body: OrganizationRegistration): Observable<Organization> {
    if (!body.description) {
      body.description = '';
    }
    return this.organizationControllerService.createNewOrganization({ body });
  }

  public addOrganizationRegistrationRequest(
    body: OrganizationRegistrationRequestData
  ): Observable<OrganizationRegistrationRequest> {
    return this.organizationRegistrationRequestControllerService.createNewOrganizationRegistrationRequest({ body });
  }

  public editOrganizationRegistrationRequest(body: OrganizationRegistrationRequest) {
    return this.organizationRegistrationRequestControllerService.updateOrganizationRegistration({ body });
  }

  fetchOrganizationRegistrationRequestListByUserId(userId: number | undefined, pageable: Pageable) {
    if (userId)
      return this.organizationRegistrationRequestControllerService.fetchOrganizationListByUserId({ userId, pageable });
    else return of();
  }
}
