import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { OrganizationRequestService } from '../../services/organization-request.service';
import { Pageable } from '../../../api/models/pageable';
import { OrganizationRegistrationRequest } from '../../../api/models/organization-registration-request';
import { AlertService } from '../../../shared/services/alert.service';
import { OrganizationRegistration } from '../../../api/models/organization-registration';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { ModalController } from '@ionic/angular';
import { OrganizationRegistrationRequestModalComponent } from '../organization-registration-request-modal/organization-registration-request-modal.component';

@Component({
  selector: 'app-organization-requests-list',
  templateUrl: './organization-requests-list.component.html',
  styleUrls: ['./organization-requests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationRequestsListComponent extends AbstractComponent implements OnInit {
  private _page = 0;
  @Input() shouldRefresh = false;
  organizationRegistrationRequests: OrganizationRegistrationRequest[] = [];
  count: number = 0;
  tableSize: number = 10;
  totalPages: number = 1;
  userRole$: Observable<string | undefined> | undefined;
  constructor(
    private organizationRequestService: OrganizationRequestService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private userService: UserService,
    private modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.userRole$ = this.userService.getUserRole();
    this._getOrganizationRegistrationRequests();
  }

  onTableSizeChange(size: number): void {
    this.tableSize = size;
    this._page = 0;
    this._getOrganizationRegistrationRequests();
  }

  onTablePageChange(page: number) {
    this._page = page - 1;
    this._getOrganizationRegistrationRequests();
  }

  approveRequest(org: OrganizationRegistrationRequest) {
    const orgRegistration: OrganizationRegistration = {
      county: org.organisationDetails?.county || '',
      description: org.organisationDetails?.details || '',
      districtId: org.organisationDetails?.districtId || 0,
      name: org.organisationDetails?.name || '',
      ownerId: org.requesterId
    };
    this.alertService.confirmationMessage('organizationRequests.approveRequest').then((choice) => {
      if (choice === 'yes') {
        this.addSubscription(
          this.organizationRequestService
            .createOrganization(orgRegistration)
            .pipe(
              catchError((error) => {
                if (error.status === 409) {
                  this.alertService.errorMessage('organizationRequests.organizationNameAlreadyExists');
                } else {
                  this.alertService.errorMessage('organizationRequests.newOrganizationCreatedError');
                }
                return EMPTY;
              }),
              switchMap(() => {
                return this._deleteRequest(org, true);
              })
            )
            .subscribe(() => {
              this.alertService.successMessage('organizationRequests.newOrganizationCreated');
            })
        );
      }
    });
  }

  denyRequest(org: OrganizationRegistrationRequest) {
    this.alertService.confirmationMessage('organizationRequests.denyRequest').then((choice) => {
      if (choice === 'yes') {
        this.addSubscription(this._deleteRequest(org, false).subscribe());
      }
    });
  }

  deleteRequestByNoRole(org: OrganizationRegistrationRequest) {
    this.alertService.confirmationMessage('organizationRequests.deleteRequest').then((choice) => {
      if (choice === 'yes') {
        this.addSubscription(this._deleteRequest(org, false).subscribe());
      }
    });
  }

  private _getOrganizationRegistrationRequests() {
    const pageable: Pageable = {
      page: this._page,
      size: this.tableSize
    };
    if (this.userRole$ !== undefined) {
      this.addSubscription(
        this.userRole$
          .pipe(
            switchMap((userRole) => {
              if (userRole === 'ADMIN') {
                return this.organizationRequestService.fetchOrganizationRegistrationRequestList(pageable);
              } else if (userRole === 'NO_ROLE') {
                return this.userService
                  .getUserId()
                  .pipe(
                    switchMap((userId) =>
                      this.organizationRequestService.fetchOrganizationRegistrationRequestListByUserId(userId, pageable)
                    )
                  );
              } else {
                return EMPTY;
              }
            })
          )
          .subscribe({
            next: (organizationRegistrationRequests) => {
              this.organizationRegistrationRequests = organizationRegistrationRequests.content || [];
              this.count = organizationRegistrationRequests.totalElements || 0;
              this.totalPages = organizationRegistrationRequests.totalPages || 0;
              this.cdr.markForCheck();
            }
          })
      );
    }
  }

  private _deleteRequest(org: OrganizationRegistrationRequest, approve: boolean): Observable<void> {
    return this.organizationRequestService.deleteOrganizationRegistrationRequest(org.id).pipe(
      tap({
        next: () => {
          const index = this.organizationRegistrationRequests.indexOf(org);
          if (index !== -1) {
            this.organizationRegistrationRequests.splice(index, 1);
          }
          this.alertService.successMessage(
            approve ? 'organizationRequests.approveSuccess' : 'organizationRequests.denySuccess'
          );
          this.cdr.markForCheck();
        },
        error: () => {
          this.alertService.errorMessage(
            approve ? 'organizationRequests.approveError' : 'organizationRequests.denyError'
          );
        }
      })
    );
  }

  async openEditOrganizationRequestModal(organizationRegistrationRequest: OrganizationRegistrationRequest) {
    const modal = await this.modalController.create({
      component: OrganizationRegistrationRequestModalComponent,
      componentProps: { mode: 'edit', selectedOrganizationRegistrationRequest: organizationRegistrationRequest }
    });
    await modal.present();
    modal.onDidDismiss().then((shouldRefresh) => {
      if (shouldRefresh.data) this._getOrganizationRegistrationRequests();
    });
  }
}
