import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistrictControllerService } from '../../api/services/district-controller.service';
import { PageDistrict } from '../../api/models/page-district';
import { OrganizationControllerService } from '../../api/services/organization-controller.service';
import { PageOrganization } from '../../api/models/page-organization';
import { Pageable } from '../../api/models/pageable';
import { Account } from '../../api/models/account';
import { Organization } from '../../api/models/organization';
import { OrganizationRequestService } from '../../organization-request/services/organization-request.service';
import { map } from 'rxjs/operators';
import { District } from '../../api/models/district';

@Injectable()
export class OrganizationService {
  constructor(
    private districtControllerService: DistrictControllerService,
    private organizationControllerService: OrganizationControllerService,
    private organizationRequestService: OrganizationRequestService
  ) {}

  public getDistricts(pageable: Pageable): Observable<PageDistrict> {
    return this.districtControllerService.fetchDistrictList({ pageable });
  }
  public getOrganizations(): Observable<PageOrganization> {
    return this.organizationControllerService.fetchOrganizationList1({ pageable: {} });
  }

  public getOrganizationsByDistrict(
    id: number,
    pageable: Pageable,
    nameFilter: undefined,
    countyFilter: undefined
  ): Observable<PageOrganization> {
    return this.organizationControllerService.getOrganizationsByDistrict({
      districtId: id,
      pageable,
      nameFilter,
      countyFilter
    });
  }

  public getMembersListByOrganizationId(id: number): Observable<Array<Account>> {
    return this.organizationControllerService.getMembersByOrganizationId({ id });
  }

  public getOrganizationById(id: number): Observable<Organization> {
    return this.organizationControllerService.findOrganizationById({ id });
  }

  public getUserHasRequestMade(requesterId: number | undefined, pageable: Pageable): Observable<boolean> {
    return this.organizationRequestService.fetchOrganizationRegistrationRequestListByUserId(requesterId, pageable).pipe(
      map((response) => {
        return !response.empty;
      })
    );
  }

  public editOrganization(body: Organization): Observable<Organization> {
    return this.organizationControllerService.editOrganizationInfo({ body });
  }

  public sendJoinOrganizationRequest(accountId: number, organizationId: number): Observable<Organization> {
    return this.organizationControllerService.addNewOrganizationMember({ body: { accountId, organizationId } });
  }

  public getDistrictsByNameSearch(districtName: string): Observable<Array<District>> {
    return this.districtControllerService.searchDistrictByName({ districtName });
  }
}
