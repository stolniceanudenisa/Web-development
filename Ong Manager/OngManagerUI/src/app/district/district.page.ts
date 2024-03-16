import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DistrictModalComponent } from './components/district-modal/district-modal.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.page.html',
  styleUrls: ['./district.page.scss']
})
export class DistrictPage {
  public refreshList = false;
  constructor(private modalController: ModalController) {}

  async openAddDistrictModal() {
    const modal = await this.modalController.create({
      component: DistrictModalComponent
    });

    await modal.present();
    modal.onDidDismiss().then(() => {
      this.refreshList = true;
    });
  }
}
