import { Injectable } from '@angular/core';
import { AccountControllerService } from '../../api/services/account-controller.service';
import { map } from 'rxjs/operators';
import { Account } from '../../api/models/account';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private accountControllerService: AccountControllerService) {}

  public isUserAdmin(): Observable<boolean> {
    return this.accountControllerService.fetchAuthenticatedUserDetails().pipe(
      map((user: Account) => {
        return user && user.role === 'ADMIN';
      })
    );
  }

  public getUserRole(): Observable<string | undefined> {
    return this.accountControllerService.fetchAuthenticatedUserDetails().pipe(
      map((user: Account) => {
        return user.role;
      })
    );
  }

  public getUserId(): Observable<number | undefined> {
    return this.accountControllerService.fetchAuthenticatedUserDetails().pipe(
      map((user: Account) => {
        return user.id;
      })
    );
  }

  public getUserDetails(): Observable<Account> {
    return this.accountControllerService.fetchAuthenticatedUserDetails();
  }

  public editUserDetails(body: Account): Observable<string> {
    return this.accountControllerService.updateAccount({ body });
  }
}
