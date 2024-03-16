import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { Organization } from '../../../api/models/organization';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../../shared/services/alert.service';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationModalComponent extends AbstractComponent implements OnInit {
  @Input() selectedOrganization: Organization | undefined;
  organizationForm!: FormGroup;
  selectedLogoFile: { src: string; name: string } | undefined;
  selectedBannerFile: { src: string; name: string } | undefined;
  constructor(
    private organizationService: OrganizationService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit() {
    this.organizationForm = this.formBuilder.group({
      id: new FormControl(this.selectedOrganization?.id ?? null),
      name: new FormControl(this.selectedOrganization?.name ?? '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      description: new FormControl(this.selectedOrganization?.description ?? '', [Validators.maxLength(1000)]),
      county: new FormControl(this.selectedOrganization?.county ?? '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      districtId: new FormControl(this.selectedOrganization?.districtId ?? ''),
      ownerId: new FormControl(this.selectedOrganization?.ownerId ?? ''),
      logo: new FormControl(this.selectedOrganization?.logo ?? ''),
      banner: new FormControl(this.selectedOrganization?.banner ?? ''),
      membersDTO: new FormControl(this.selectedOrganization?.membersDTO ?? '')
    });
  }

  public get organizationNameControl(): FormControl {
    return this.organizationForm.get('name') as FormControl;
  }

  public get organizationDescriptionControl(): FormControl {
    return this.organizationForm.get('description') as FormControl;
  }

  public get organizationCountyControl(): FormControl {
    return this.organizationForm.get('county') as FormControl;
  }

  dismissModal(shouldRefresh: boolean) {
    this.modalController.dismiss(shouldRefresh);
  }

  onFileChange(event: any, fileType: 'logo' | 'banner') {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        if (fileType === 'logo') {
          this.selectedLogoFile = { src: base64String, name: file.name };
          this.organizationForm.patchValue({ logo: base64Data });
        } else if (fileType === 'banner') {
          this.selectedBannerFile = { src: base64String, name: file.name };
          this.organizationForm.patchValue({ banner: base64Data });
        }

        const fileInputId = `${fileType}FileInput`;
        const fileInput = document.getElementById(fileInputId) as HTMLInputElement | null;
        if (fileInput) {
          fileInput.dispatchEvent(new Event('change'));
        }
      };
      reader.readAsDataURL(file);
    }
  }

  selectFile(fileType: 'logo' | 'banner') {
    const fileInputId = `${fileType}FileInput`;
    const fileInput = document.getElementById(fileInputId) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }

  editOrganization() {
    if (this.organizationForm.valid) {
      this.addSubscription(
        this.organizationService
          .editOrganization({
            id: this.selectedOrganization?.id ?? 0,
            name: this.organizationForm.value.name,
            county: this.organizationForm.value.county,
            description: this.organizationForm.value.description,
            districtId: this.organizationForm.value.districtId,
            ownerId: this.organizationForm.value.ownerId,
            logo: this.organizationForm.value.logo,
            banner: this.organizationForm.value.banner,
            membersDTO: this.organizationForm.value.membersDTO
          })
          .subscribe({
            next: () => {
              this.alertService.successMessage('organization.organizationEdited');
              this.dismissModal(true);
            },
            error: (err) => {
              if (err.status === 409) {
                this.alertService.errorMessage('organization.organizationNameAlreadyExists');
              } else {
                this.alertService.errorMessage('anErrorOccured');
              }
            }
          })
      );
    }
  }
}
