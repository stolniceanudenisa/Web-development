/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageOrganizationRegistrationRequest } from '../../models/page-organization-registration-request';

export interface FetchOrganizationListByUserId$Params {
  userId: number;
  pageable: Pageable;
}

export function fetchOrganizationListByUserId(http: HttpClient, rootUrl: string, params: FetchOrganizationListByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganizationRegistrationRequest>> {
  const rb = new RequestBuilder(rootUrl, fetchOrganizationListByUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageOrganizationRegistrationRequest>;
    })
  );
}

fetchOrganizationListByUserId.PATH = '/organization/registration-request/get/all/{userId}';
