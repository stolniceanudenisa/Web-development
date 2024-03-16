import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateComponent } from './components/translate/translate.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
  declarations: [MenuComponent, PaginationComponent, MenuComponent, AppHeaderComponent, TranslateComponent, ProfileModalComponent],
  exports: [MenuComponent, PaginationComponent, MenuComponent, TranslateComponent, ProfileModalComponent, AppHeaderComponent],
  imports: [CommonModule, TranslateModule, IonicModule, ReactiveFormsModule, RouterLinkActive, RouterLink, FormsModule],
  providers: [UserService]
})
export class SharedModule {}
