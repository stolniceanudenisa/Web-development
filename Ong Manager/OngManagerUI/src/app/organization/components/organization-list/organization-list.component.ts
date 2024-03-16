import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { District } from '../../../api/models/district';
import { Observable, of, switchMap } from 'rxjs';
import { PageOrganization } from '../../../api/models/page-organization';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { Organization } from '../../../api/models/organization';
import { ModalController } from '@ionic/angular';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { AlertService } from '../../../shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListComponent extends AbstractComponent implements OnInit {
  @Input() userRole!: string;

  private _page: number = 0;
  private _selectedDistrict!: District;

  searchDistrict = '';

  tableSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 1;

  districts: District[] = [];
  organizations!: PageOrganization;

  constructor(
    private organizationService: OrganizationService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController,
    private alertService: AlertService,
    private translate: TranslateService,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.organizationService.getDistrictsByNameSearch('').subscribe((result: District[]) => {
        this.districts = result;
        this.selectDistrict(this.districts[0]);
      })
    );
  }
  async openEditOrganizationModal(organization: Organization) {
    const modal = await this.modalController.create({
      component: OrganizationModalComponent,
      componentProps: { selectedOrganization: organization }
    });

    await modal.present();
    modal.onDidDismiss().then((shouldRefresh) => {
      if (shouldRefresh.data) this._getOrganizations();
    });
  }

  onTablePageChange(page: number): void {
    this._page = page - 1;
    this._getOrganizations();
  }

  onTableSizeChange(size: number): void {
    this.tableSize = size;
    this._page = 0;
    this._getOrganizations();
  }

  onSearch(ev: any) {
    const districtName = ev.target.value;
    if (districtName !== '') {
      this.addSubscription(
        this.organizationService.getDistrictsByNameSearch(districtName).subscribe((result: District[]) => {
          this.districts = result;
          this.cdr.markForCheck();
        })
      );
    } else {
      this.districts = [];
      this.cdr.markForCheck();
    }
  }

  selectDistrict(district: District) {
    this._selectedDistrict = district;
    this.searchDistrict = district.name ?? '';
    this.addSubscription(
      this._fetchOrganizationsByDistrict().subscribe((result: PageOrganization) => {
        this._setOrganizations(result);
        this.districts = [];
        this.cdr.markForCheck();
      })
    );
  }

  async confirmJoinOrganization(organization: Organization) {
    const confirmation = await this.alertService.confirmationMessage(
      this.translate.instant('organization.noRoleUser.confirmJoinOrganization')
    );

    if (confirmation === 'yes') {
      this.addSubscription(
        this.userService
          .getUserId()
          .pipe(
            switchMap((result: number | undefined) => {
              const userAccountId = result;
              if (userAccountId) {
                return this.organizationService.sendJoinOrganizationRequest(userAccountId, organization.id);
              } else {
                return of(null);
              }
            })
          )
          .subscribe({
            next: (organizationResult: Organization | null) => {
              if (organizationResult) {
                this.alertService.successMessage(
                  this.translate.instant('organization.noRoleUser.successJoinOrganization'),
                  () => {
                    this.router.navigate(['home/member-organization-details']);
                  }
                );
              } else {
                this.alertService.errorMessage(this.translate.instant('organization.noRoleUser.errorJoinOrganization'));
              }
            },
            error: () => {
              this.alertService.errorMessage(this.translate.instant('organization.noRoleUser.errorJoinOrganization'));
            }
          })
      );
    }
  }

  private _fetchOrganizationsByDistrict(): Observable<PageOrganization> {
    if (this._selectedDistrict.id !== undefined) {
      return this.organizationService.getOrganizationsByDistrict(
        this._selectedDistrict.id,
        { page: this._page, size: this.tableSize, sort: undefined },
        undefined,
        undefined
      );
    } else return of();
  }

  private _setOrganizations(result: PageOrganization): void {
    this.organizations = result;
    this.totalElements = result.totalElements ?? 0;
    this.totalPages = result.totalPages ?? 0;
    this.cdr.markForCheck();
  }

  private _getOrganizations(): void {
    this.addSubscription(
      this._fetchOrganizationsByDistrict().subscribe((result: PageOrganization) => {
        this._setOrganizations(result);
      })
    );
  }
}
