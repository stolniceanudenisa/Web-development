import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrganizationRegistrationRequestModalComponent } from '../organization-request/components/organization-registration-request-modal/organization-registration-request-modal.component';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Pageable } from '../api/models/pageable';
import { OrganizationService } from './services/organization.service';
import { AbstractComponent } from '../shared/components/abstract/abstract.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationPage extends AbstractComponent {
  private _pageable!: Pageable;
  userRole$!: Observable<string | undefined>;
  userHasRequestMade$!: Observable<boolean>;
  requesterId!: number | undefined;

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private organizationService: OrganizationService
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.userService.getUserId().subscribe((userId) => {
        this.requesterId = userId;
        this.userHasRequestMade$ = this.organizationService.getUserHasRequestMade(this.requesterId, this._pageable);
      })
    );
    this.userRole$ = this.userService.getUserRole();
  }

  async openOrganizationRegistrationRequestModal() {
    const modal = await this.modalController.create({
      component: OrganizationRegistrationRequestModalComponent
    });
    await modal.present();
  }
}
