/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageAccount } from '../../models/page-account';

export interface FetchAccountList$Params {
  pageable: Pageable;
}

export function fetchAccountList(http: HttpClient, rootUrl: string, params: FetchAccountList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageAccount>> {
  const rb = new RequestBuilder(rootUrl, fetchAccountList.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageAccount>;
    })
  );
}

fetchAccountList.PATH = '/account/get/all';
