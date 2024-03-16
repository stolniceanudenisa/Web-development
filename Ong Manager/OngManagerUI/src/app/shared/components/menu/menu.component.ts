import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuTabs } from '../../models/menu-tabs';
import { UserService } from '../../services/user.service';
import { AbstractComponent } from '../abstract/abstract.component';
import { ModalController } from '@ionic/angular';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent extends AbstractComponent {
  @Input() listTabs: MenuTabs[] = [];
  @Input() userRole: string | undefined;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController
  ) {
    super();
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileModalComponent
    });
    await modal.present();
  }
}
