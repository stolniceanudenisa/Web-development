import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract/abstract.component';
import { Account } from '../../../api/models/account';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileModalComponent extends AbstractComponent implements OnInit {
  profileForm!: FormGroup;
  selectedProfilePicture: { src: string; name: string } | undefined;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group(
      {
        id: new FormControl(null),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.email
        ]),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        birthdate: new FormControl(''),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
        accountDescription: new FormControl(''),
        profilePicture: new FormControl('', []),
        role: new FormControl('')
      },
      {
        validators: this._phoneNumberDigitValidator
      }
    );
    this.addSubscription(
      this.userService.getUserDetails().subscribe((result: Account) => {
        if (result) {
          this.profileForm.patchValue({
            id: result.id,
            email: result.email,
            firstName: result.personalInformationDTO?.firstName,
            lastName: result.personalInformationDTO?.lastName,
            birthdate: result.personalInformationDTO?.birthdate,
            phoneNumber: result.personalInformationDTO?.phoneNumber,
            accountDescription: result.accountDescription,
            profilePicture: result.profilePicture,
            role: result.role
          });
        }
      })
    );
  }

  public get userEmailControl(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }

  public get userFirstNameControl(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }

  public get userLastNameControl(): FormControl {
    return this.profileForm.get('lastName') as FormControl;
  }

  public get userBirthdateControl(): FormControl {
    return this.profileForm.get('birthdate') as FormControl;
  }

  public get userPhoneNumberControl(): FormControl {
    return this.profileForm.get('phoneNumber') as FormControl;
  }

  public get userAccountDescriptionControl(): FormControl {
    return this.profileForm.get('accountDescription') as FormControl;
  }

  public get userProfilePictureControl(): FormControl {
    return this.profileForm.get('profilePicture') as FormControl;
  }

  public get userRoleControl(): FormControl {
    return this.profileForm.get('role') as FormControl;
  }

  dismissModal(shouldRefresh: boolean) {
    this.modalController.dismiss(shouldRefresh);
  }

  editProfile() {
    const body = {
      id: this.profileForm.value.id,
      email: this.profileForm.value.email,
      accountDescription: this.profileForm.value.accountDescription,
      personalInformationDTO: {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        birthdate: this.profileForm.value.birthdate,
        phoneNumber: this.profileForm.value.phoneNumber
      },
      profilePicture: this.profileForm.value.profilePicture,
      role: this.profileForm.value.role
    };
    this.addSubscription(
      this.userService
        .editUserDetails(body)
        .pipe(catchError((val) => of(`I caught: ${val}`)))
        .subscribe({
          next: () => {
            this.modalController.dismiss();
            this.alertService.successMessage(this.translateService.instant('profile.updateSuccess'));
          },
          error: (err) => {
            if (err.status === 409) {
              this.modalController.dismiss();
              this.alertService.errorMessage('anErrorOccured');
            } else {
              this.alertService.errorMessage('other error');
            }
          }
        })
    );
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        this.selectedProfilePicture = { src: base64String, name: file.name };
        this.profileForm.patchValue({ profilePicture: base64Data });

        const fileInputId = `FileInput`;
        const fileInput = document.getElementById(fileInputId) as HTMLInputElement | null;
        if (fileInput) {
          fileInput.dispatchEvent(new Event('change'));
        }
      };
      reader.readAsDataURL(file);
    }
  }

  selectFile() {
    const fileInputId = 'FileInput';
    const fileInput = document.getElementById(fileInputId) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }

  showEmailNotValidError(): boolean {
    return (
      this.userEmailControl.hasError('email') &&
      !this.userEmailControl.hasError('minlength') &&
      !this.userEmailControl.hasError('maxlength') &&
      this.userEmailControl.touched
    );
  }

  private _phoneNumberDigitValidator(formGroup: FormGroup): { phoneNumberNotValid: boolean } | null {
    if (formGroup.get('phoneNumber')?.valid && !/^[0-9]+$/.test(formGroup.get('phoneNumber')?.value)) {
      formGroup.get('phoneNumber')?.setErrors({ phoneNumberNotValid: true });
      return { phoneNumberNotValid: true };
    } else {
      return null;
    }
  }
}
