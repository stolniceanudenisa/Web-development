import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TokensService } from './services/tokens.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { NoRoleGuard } from './guards/no-role.guard';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { TranslateComponent } from '../shared/components/translate/translate.component';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    TokensService,
    AuthGuard,
    NoRoleGuard
  ]
})
export class CoreModule {}
