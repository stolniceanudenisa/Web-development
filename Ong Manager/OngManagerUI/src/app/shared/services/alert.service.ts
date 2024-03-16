import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertService {
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  async successMessage(message: string, okHandler?: () => void) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('succes'),
      message: this.translateService.instant(message),
      cssClass: 'success-alert',
      buttons: [{ text: this.translateService.instant('ok'), handler: okHandler }]
    });
    await alert.present();
  }

  async infoMessage(message: string) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('info'),
      message: this.translateService.instant(message),
      cssClass: 'info-alert',
      buttons: [this.translateService.instant('ok')]
    });
    await alert.present();
  }
  async errorMessage(message: string) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('error'),
      message: this.translateService.instant(message),
      cssClass: 'error-alert',
      buttons: [this.translateService.instant('ok')]
    });
    await alert.present();
  }

  async confirmationMessage(message: string): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const alert = await this.alertController.create({
        message: this.translateService.instant(message),
        cssClass: 'confirmation-message-alert',
        buttons: [
          {
            text: this.translateService.instant('yes'),
            handler: () => resolve('yes')
          },
          {
            text: this.translateService.instant('no'),
            handler: () => resolve('no')
          }
        ]
      });
      await alert.present();
    });
  }
}
