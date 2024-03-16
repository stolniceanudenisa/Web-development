import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { OrganizationRequestService } from '../../services/organization-request.service';
import { OrganizationService } from '../../../organization/services/organization.service';
import { PageDistrict } from '../../../api/models/page-district';
import { UserService } from '../../../shared/services/user.service';
import { OrganizationRegistrationRequest } from '../../../api/models/organization-registration-request';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-organization-registration-request-modal',
  templateUrl: './organization-registration-request-modal.component.html',
  styleUrls: ['./organization-registration-request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationRegistrationRequestModalComponent extends AbstractComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() selectedOrganizationRegistrationRequest: OrganizationRegistrationRequest | undefined;
  organizationRegistrationRequestForm!: FormGroup;
  districts!: PageDistrict;
  requesterId!: number | undefined;
  translatedTitle: string | undefined;
  translatedButton: string | undefined;

  constructor(
    private organizationRequestService: OrganizationRequestService,
    private organizationService: OrganizationService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.organizationRegistrationRequestForm = this.formBuilder.group({
      id: new FormControl(this.selectedOrganizationRegistrationRequest?.id ?? null),
      name: new FormControl(this.selectedOrganizationRegistrationRequest?.organisationDetails?.name ?? '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      county: new FormControl(this.selectedOrganizationRegistrationRequest?.organisationDetails?.county ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      details: new FormControl(
        this.selectedOrganizationRegistrationRequest?.organisationDetails?.details ?? '',
        Validators.maxLength(1000)
      ),
      districtId: new FormControl(this.selectedOrganizationRegistrationRequest?.organisationDetails?.districtId ?? 0)
    });

    this.translatedTitle = this.translateService.instant(
      this.mode === 'edit'
        ? 'organizationRequests.editOrganizationRegistrationRequest'
        : 'organizationRequests.createOrganizationRegistrationRequest'
    );
    this.translatedButton = this.translateService.instant(
      this.mode === 'edit' ? 'organizationRequests.save' : 'organizationRequests.create'
    );

    this.userService.getUserId().subscribe((userId) => {
      this.requesterId = userId;
    });
    this.loadDistricts();
  }

  loadDistricts() {
    this.organizationService.getDistricts({}).subscribe((data: PageDistrict) => {
      this.districts = data;
      if (data?.content !== undefined && this.mode !== 'edit') {
        this.districtIdControl.setValue(data.content[0].id);
      }
    });
  }

  public get nameControl(): FormControl {
    return this.organizationRegistrationRequestForm.get('name') as FormControl;
  }

  public get countyControl(): FormControl {
    return this.organizationRegistrationRequestForm.get('county') as FormControl;
  }

  public get detailsControl(): FormControl {
    return this.organizationRegistrationRequestForm.get('details') as FormControl;
  }

  public get districtIdControl(): FormControl {
    return this.organizationRegistrationRequestForm.get('districtId') as FormControl;
  }

  dismissModal(shouldRefresh: boolean) {
    this.modalController.dismiss(shouldRefresh);
  }

  actionOrganizationRegistrationRequest() {
    if (this.organizationRegistrationRequestForm.valid) {
      const endpoint =
        this.mode === 'edit'
          ? this.organizationRequestService.editOrganizationRegistrationRequest({
              id: this.selectedOrganizationRegistrationRequest?.id ?? 0,
              organisationDetails: {
                name: this.organizationRegistrationRequestForm.value.name,
                county: this.organizationRegistrationRequestForm.value.county,
                details: this.organizationRegistrationRequestForm.value.details,
                districtId: this.organizationRegistrationRequestForm.value.districtId
              },
              requesterId: this.requesterId ?? 0
            })
          : this.organizationRequestService.addOrganizationRegistrationRequest({
              ...this.organizationRegistrationRequestForm.value,
              requesterId: this.requesterId
            });

      this.addSubscription(
        endpoint.subscribe({
          next: () => {
            this.alertService.successMessage(
              this.mode === 'edit'
                ? 'organizationRequests.organizationRequestEdited'
                : 'organizationRequests.organizationRequestCreated'
            );
            this.dismissModal(true);
          },
          error: (err) => {
            if (err.status === 409) {
              this.alertService.errorMessage('organizationRequests.maxRequestsReached');
            } else {
              this.alertService.errorMessage('anErrorOccured');
            }
          }
        })
      );
    }
  }
}
