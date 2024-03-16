import { CanActivateFn, Router } from '@angular/router';
import { TokensService } from '../services/tokens.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private tokensService: TokensService
  ) {}

  canActivate: CanActivateFn = () => {
    if (this.tokensService.isAccessTokenGenerated()) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  };
}
