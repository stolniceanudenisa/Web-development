/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageOrganization } from '../../models/page-organization';

export interface FetchOrganizationList1$Params {
  pageable: Pageable;
}

export function fetchOrganizationList1(http: HttpClient, rootUrl: string, params: FetchOrganizationList1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganization>> {
  const rb = new RequestBuilder(rootUrl, fetchOrganizationList1.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageOrganization>;
    })
  );
}

fetchOrganizationList1.PATH = '/organization/get/all';
