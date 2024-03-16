import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return next.handle(authRequest).pipe(
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            this.router.navigate(['auth']);
          }
          return EMPTY;
        })
      );
    }
    return next.handle(request);
  }
}
