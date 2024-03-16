import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './auth.page';
import { PasswordPageComponent } from './components/password-page/password-page.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'set-password/:code',
        component: PasswordPageComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },

      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}
