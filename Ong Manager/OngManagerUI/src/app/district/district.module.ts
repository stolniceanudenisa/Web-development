import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictService } from './services/district.service';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { DistrictModalComponent } from './components/district-modal/district-modal.component';
import { DistrictListComponent } from './components/district-list/district-list.component';
import { DistrictRoutingModule } from './district-routing.module';
import { DistrictPage } from './district.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, DistrictRoutingModule, ReactiveFormsModule, TranslateModule],
  declarations: [DistrictModalComponent, DistrictListComponent,DistrictPage],
  exports: [DistrictListComponent, DistrictPage],
  providers: [DistrictService]
})
export class DistrictModule {}
