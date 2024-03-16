import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { PageOrganization } from '../../../api/models/page-organization';
import { Account } from '../../../api/models/account';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersListComponent extends AbstractComponent implements OnInit {
  members: Account[] = [];
  organizations!: PageOrganization;
  @Input() organizationId!: number;

  constructor(
    private organizationService: OrganizationService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.organizationService.getOrganizations().subscribe((data: PageOrganization) => {
        this.organizations = data;
        if (data?.content !== undefined) {
          this._getMembers();
        } else {
          this._setMembers([]);
        }
      })
    );
  }

  private _setMembers(result: Account[]) {
    this.members = result;
    this.cdr.markForCheck();
  }

  private _fetchMembersListByOrganization(): Observable<Account[]> {
    if (this.organizationService.getOrganizationById(this.organizationId) !== undefined) {
      return this.organizationService.getMembersListByOrganizationId(this.organizationId);
    } else {
      return of([]);
    }
  }
  private _getMembers(): void {
    this.addSubscription(
      this._fetchMembersListByOrganization().subscribe((result: Account[]) => {
        this._setMembers(result);
      })
    );
  }
}
