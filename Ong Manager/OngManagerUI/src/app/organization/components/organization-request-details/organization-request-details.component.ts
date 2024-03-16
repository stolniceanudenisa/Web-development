import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrganizationRegistrationRequestControllerService } from '../../../api/services/organization-registration-request-controller.service';
import { OrganizationRegistrationRequest } from '../../../api/models/organization-registration-request';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { UserService } from '../../../shared/services/user.service';
import { of, switchMap } from 'rxjs';
import { PageOrganizationRegistrationRequest } from '../../../api/models/page-organization-registration-request';

@Component({
  selector: 'app-organization-request-details',
  templateUrl: './organization-request-details.component.html',
  styleUrls: ['./organization-request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationRequestDetailsComponent extends AbstractComponent implements OnInit {
  organizationRegistrationRequest!: OrganizationRegistrationRequest;

  constructor(
    private organizationRegistrationRequestControllerService: OrganizationRegistrationRequestControllerService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.userService
        .getUserId()
        .pipe(
          switchMap((result: number | undefined) => {
            if (result !== undefined)
              return this.organizationRegistrationRequestControllerService.fetchOrganizationListByUserId({
                userId: result,
                pageable: {}
              });
            else return of(null);
          })
        )
        .subscribe((organizationRequestList: PageOrganizationRegistrationRequest | null) => {
          if (organizationRequestList?.content) {
            this.organizationRegistrationRequest = organizationRequestList.content[0];
            this.cdr.markForCheck();
          }
        })
    );
  }
}
