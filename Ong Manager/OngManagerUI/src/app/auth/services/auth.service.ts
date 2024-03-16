import { Injectable } from '@angular/core';
import { AccountControllerService } from '../../api/services/account-controller.service';
import { Observable } from 'rxjs';
import { AccountRegistration } from '../../api/models/account-registration';

@Injectable()
export class AuthService {
  private _redirectURL = `http://localhost:8080/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:4200/authorized`;

  constructor(private accountControllerService: AccountControllerService) {}

  public redirectToLogin(): void {
    window.location.href = this._redirectURL;
  }

  public setNewAccountPassword(password: string, activationCode: string): Observable<string> {
    return this.accountControllerService.setNewAccountPassword({ activationCode, body: { password } });
  }

  public registerNewAccount(body: AccountRegistration): Observable<string> {
    return this.accountControllerService.registerNewAccount({ body });
  }
}
