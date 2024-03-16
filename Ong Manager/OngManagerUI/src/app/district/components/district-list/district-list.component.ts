import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { DistrictService } from '../../services/district.service';
import { District } from '../../../api/models/district';
import { Pageable } from '../../../api/models/pageable';
import { AbstractComponent } from '../../../shared/components/abstract/abstract.component';
import { ModalController } from '@ionic/angular';
import { DistrictModalComponent } from '../district-modal/district-modal.component';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistrictListComponent extends AbstractComponent implements OnInit, OnChanges {
  private _page = 0;
  @Input() shouldRefresh = false;
  districts: District[] = [];
  count: number = 0;
  tableSize: number = 10;
  totalPages: number = 1;

  constructor(
    private districtService: DistrictService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit() {
    this._getDistricts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shouldRefresh'].currentValue) {
      this._getDistricts();
    }
  }

  onTableSizeChange(size: number): void {
    this.tableSize = size;
    this._page = 0;
    this._getDistricts();
  }

  onTablePageChange(page: number) {
    this._page = page - 1;
    this._getDistricts();
  }

  private _getDistricts() {
    const pageable: Pageable = {
      page: this._page,
      size: this.tableSize
    };
    this.addSubscription(
      this.districtService.fetchDistrictList(pageable).subscribe({
        next: (districts) => {
          this.districts = districts.content || [];
          this.count = districts.totalElements || 0;
          this.totalPages = districts.totalPages || 0;
          this.cdr.markForCheck();
        }
      })
    );
  }

  async openEditDistrictModal(district: District) {
    const modal = await this.modalController.create({
      component: DistrictModalComponent,
      componentProps: { mode: 'edit', selectedDistrict: district }
    });

    await modal.present();
    modal.onDidDismiss().then((shouldRefresh) => {
      if (shouldRefresh.data) this._getDistricts();
    });
  }

  deleteDistrict(district: District) {
    this.alertService.confirmationMessage('district.deleteDistrict').then((choice) => {
      if (choice === 'yes' && district.id !== undefined) {
        this.districtService.deleteDistrict(district.id).subscribe({
          next: () => {
            const index = this.districts.indexOf(district);
            if (index !== -1) {
              this.districts.splice(index, 1);
            }
            this.alertService.successMessage('district.deleteSuccess');
            this.cdr.markForCheck();
          },
          error: () => {
            this.alertService.errorMessage('district.deleteError');
          }
        });
      }
    });
  }
}
