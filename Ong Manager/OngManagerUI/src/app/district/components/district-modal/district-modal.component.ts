import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DistrictService } from '../../services/district.service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { TranslateService } from '@ngx-translate/core';
import { District } from '../../../api/models/district';

@Component({
  selector: 'app-add-district',
  templateUrl: './district-modal.component.html',
  styleUrls: ['./district-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistrictModalComponent extends AbstractComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() selectedDistrict: District | undefined;
  districtForm!: FormGroup;
  translatedTitle: string | undefined;
  translatedButton: string | undefined;

  constructor(
    private districtService: DistrictService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.districtForm = this.formBuilder.group({
      id: new FormControl(this.selectedDistrict?.id ?? null),
      name: new FormControl(this.selectedDistrict?.name ?? '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      description: new FormControl(this.selectedDistrict?.description ?? '', [
        Validators.required,
        Validators.maxLength(1000)
      ]),
      districtNumber: new FormControl(this.selectedDistrict?.districtNumber ?? '', Validators.required),
      countries: new FormControl(this.selectedDistrict?.countries?.concat().toString() ?? '', Validators.required)
    });

    this.translatedTitle = this.translateService.instant(
      this.mode === 'edit' ? 'district.editDistrict' : 'district.addDistrict'
    );
    this.translatedButton = this.translateService.instant(this.mode === 'edit' ? 'district.save' : 'district.create');
  }

  public get districtNameControl(): FormControl {
    return this.districtForm.get('name') as FormControl;
  }

  public get districtDescriptionControl(): FormControl {
    return this.districtForm.get('description') as FormControl;
  }

  public get districtNumberControl(): FormControl {
    return this.districtForm.get('districtNumber') as FormControl;
  }

  public get districtCountriesControl(): FormControl {
    return this.districtForm.get('countries') as FormControl;
  }

  dismissModal(shouldRefresh: boolean) {
    this.modalController.dismiss(shouldRefresh);
  }

  actionDistrict() {
    if (this.districtForm.valid) {
      const districtData = this.districtForm.value;

      districtData.countries = this.districtForm.value.countries.split(',').map((country: string) => country.trim());

      const endpoint =
        this.mode === 'edit'
          ? this.districtService.editDistrict(districtData)
          : this.districtService.addDistrict(districtData);
      this.addSubscription(
        endpoint.subscribe({
          next: () => {
            this.alertService.successMessage(
              this.mode === 'edit' ? 'district.districtEdited' : 'district.districtAdded'
            );
            this.dismissModal(true);
          },
          error: (err) => {
            if (err.status === 409) {
              this.alertService.errorMessage('district.districtCountryAlreadyInUse');
            } else {
              this.alertService.errorMessage('anErrorOccured');
            }
          }
        })
      );
    }
  }
}
