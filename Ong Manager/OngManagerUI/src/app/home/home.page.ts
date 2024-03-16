import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokensService } from '../core/services/tokens.service';
import { MenuTabs } from '../shared/models/menu-tabs';
import { UserService } from '../shared/services/user.service';
import { switchMap } from 'rxjs';
import { AbstractComponent } from '../shared/components/abstract/abstract.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage extends AbstractComponent implements OnInit {
  public menuTabs: MenuTabs[] = [];
  userRole: string | undefined;

  constructor(
    private tokensService: TokensService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.tokensService
        .getAccessToken()
        .pipe(
          switchMap(() => {
            return this.userService.getUserRole();
          })
        )
        .subscribe((result: string | undefined) => {
          this.userRole = result;
          switch (result) {
            case 'ADMIN':
              this.menuTabs = [
                {
                  tabName: 'district',
                  path: 'district'
                },
                {
                  tabName: 'organization',
                  path: 'organization'
                },
                {
                  tabName: 'organizationRequest',
                  path: 'organization-request'
                }
              ];
              break;

            case 'NO_ROLE':
              this.menuTabs = [
                {
                  tabName: 'organizationDetails',
                  path: 'organization-details'
                }
              ];
              break;

            case 'ASPIRING_MEMBER':
              this.menuTabs = [
                {
                  tabName: 'organization',
                  path: 'member-organization-details'
                }
              ];
              break;

            default:
              this.menuTabs = [];
              break;
          }
          this.cdr.markForCheck();
        })
    );
  }
}
