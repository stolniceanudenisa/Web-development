import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordPageComponent } from './components/password-page/password-page.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    CoreModule
  ],
  declarations: [AuthPage, WelcomeComponent, RegisterComponent, PasswordPageComponent],
  providers: [AuthService, AlertService]
})
export class AuthPageModule {}
