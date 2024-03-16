import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../../shared/services/alert.service';
import { Buffer } from 'buffer';

@Injectable()
export class TokensService {
  private _authorizationCode: string = '';
  private _accessTokenURL: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  public isAccessTokenGenerated() {
    return localStorage.getItem('access_token') != null;
  }

  public getAccessToken(): Observable<Object> {
    return this.activateRoute.queryParams.pipe(
      switchMap((params) => {
        if (params?.['code']) {
          this._authorizationCode = params['code'];
          this._accessTokenURL = `http://localhost:8080/oauth2/token?client_id=client&redirect_uri=http://localhost:4200/authorized&grant_type=authorization_code&code=${this._authorizationCode}`;

          return this._generateAccessToken();
        }
        return of({ id_token: localStorage.getItem('id_token'), access_token: localStorage.getItem('access_token') });
      }),
      take(1),
      tap({
        next: (tokens) => {
          if ((tokens as any).id_token && (tokens as any).access_token) {
            this._setTokens((tokens as any).access_token, (tokens as any).id_token);
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          if (!localStorage.getItem('access_token')) {
            this.alertService.errorMessage('auth.errorTokens');
          }
        }
      })
    );
  }

  private _generateAccessToken(): Observable<object> {
    const mockUserClient = 'client';
    const mockUserSecret = 'secret';
    const basicAuth = `Basic ` + Buffer.from(`${mockUserClient}:${mockUserSecret}`).toString('base64');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: basicAuth
    });
    return this.httpClient.post(this._accessTokenURL, null, { headers });
  }

  private _setTokens(accessToken: string, idToken: string) {
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
    }
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
  }
}
