import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordPageComponent extends AbstractComponent {
  passwordForm: FormGroup;
  private _activationCode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    super();
    this.passwordForm = this.formBuilder.group(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      },
      {
        validators: this._passwordMatchValidator
      }
    );

    this._activationCode = this.route.snapshot.params['code'];
  }

  public get passwordControl() {
    return this.passwordForm.get('password');
  }

  public get confirmPasswordControl() {
    return this.passwordForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const password = this.passwordControl?.value;
      const activationCode = this._activationCode;
      this.addSubscription(
        this.authService.setNewAccountPassword(password, activationCode).subscribe({
          next: () => {
            this.alertService.successMessage('auth.setPassword.success', () => {
              this.authService.redirectToLogin();
            });
          },
          error: () => {
            this.alertService.errorMessage('auth.setPassword.error');
          }
        })
      );
    }
  }

  private _passwordMatchValidator(formGroup: FormGroup): { passwordMismatch: boolean } | null {
    if (
      formGroup.get('password')?.valid &&
      formGroup.get('confirmPassword')?.valid &&
      formGroup.get('password')?.value !== formGroup.get('confirmPassword')?.value
    ) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
