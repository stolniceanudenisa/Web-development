import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { AlertService } from '../../../shared/services/alert.service';
import { UserService } from '../../../shared/services/user.service';
import { Observable, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationStatusService } from '../../services/organization-status.service';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../../api/models/organization';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationDetailsComponent extends AbstractComponent implements OnInit {
  organizationId!: number;
  organization: any = { enabled: true };
  organizationFetched!: Organization;
  userRole$: Observable<string | undefined> | undefined;
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private organizationStatusService: OrganizationStatusService,
    private organizationService: OrganizationService,
    private modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.addSubscription(
      this.route.params
        .pipe(
          switchMap((params) => {
            this.organizationId = +params['id'];
            this.organization.enabled = this.organizationStatusService.getOrganizationStatus(this.organizationId);
            this.userRole$ = this.userService.getUserRole();
            return this.organizationService.getOrganizationById(this.organizationId);
          })
        )
        .subscribe((data) => {
          this.organizationFetched = data;
          this.cdr.markForCheck();
        })
    );
  }

  async confirmEnableDisable() {
    const actionKey = this.organization.enabled ? 'enable' : 'disable';
    const translationKey = 'organization.confirmDisableEnable';

    const confirmation = await this.alertService.confirmationMessage(
      this.translate.instant(translationKey, {
        action: this.translate.instant(`organization.${actionKey}`)
      })
    );

    if (confirmation === 'yes') {
      this.organization.enabled = !this.organization.enabled;
      this.organizationStatusService.setOrganizationStatus(this.organizationId, this.organization.enabled);
      this.cdr.markForCheck();
    }
  }

  async openEditOrganizationModal(organization: Organization) {
    const modal = await this.modalController.create({
      component: OrganizationModalComponent,
      componentProps: { selectedOrganization: organization }
    });

    await modal.present();
    modal.onDidDismiss().then((shouldRefresh) => {
      if (shouldRefresh.data) {
        this.addSubscription(
          this.organizationService.getOrganizationById(this.organizationId).subscribe((data) => {
            this.organizationFetched = data;
            this.cdr.markForCheck();
          })
        );
      }
    });
  }
}
