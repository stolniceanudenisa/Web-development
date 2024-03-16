import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NoRoleGuard {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate: CanActivateFn = () => {
    return this.userService.getUserRole().pipe(
      map((getUserRole: string | undefined) => {
        if (getUserRole == 'NO_ROLE') return true;
        else {
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  };
}
