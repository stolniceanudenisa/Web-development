import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountControllerService } from '../../api/services/account-controller.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router);
  const accountControllerService: AccountControllerService = inject(AccountControllerService);

  const userService = new UserService(accountControllerService);
  return userService.isUserAdmin().pipe(
    map((isUserAdmin: boolean) => {
      if (isUserAdmin) {
        return true;
      } else {
        router.navigate(['auth/welcome']);
        return false;
      }
    })
  );
};
