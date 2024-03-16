import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends AbstractComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  public get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  public get firstNameControl(): FormControl {
    return this.registrationForm.get('firstName') as FormControl;
  }

  public get lastNameControl(): FormControl {
    return this.registrationForm.get('lastName') as FormControl;
  }

  public registrationSubmit(): void {
    const formData = this.registrationForm.value;
    this.addSubscription(
      this.authService.registerNewAccount(formData).subscribe({
        next: () => {
          this.alertService.successMessage('registrationSuccesful');
        },
        error: (err) => {
          this.emailControl.setErrors({ error409: true });
          if (err.status === 409) {
            this.alertService.errorMessage('emailAlreadyInUse');
          } else {
            this.alertService.errorMessage('anErrorOccured');
          }
        }
      })
    );
  }
}
