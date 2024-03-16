/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Account } from '../../models/account';

export interface FindAccountById$Params {
  id: number;
}

export function findAccountById(http: HttpClient, rootUrl: string, params: FindAccountById$Params, context?: HttpContext): Observable<StrictHttpResponse<Account>> {
  const rb = new RequestBuilder(rootUrl, findAccountById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Account>;
    })
  );
}

findAccountById.PATH = '/account/{id}';
