/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageOrganization } from '../../models/page-organization';

export interface GetOrganizationsByDistrict$Params {
  districtId: number;
  nameFilter?: string;
  countyFilter?: string;
  pageable: Pageable;
}

export function getOrganizationsByDistrict(http: HttpClient, rootUrl: string, params: GetOrganizationsByDistrict$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganization>> {
  const rb = new RequestBuilder(rootUrl, getOrganizationsByDistrict.PATH, 'get');
  if (params) {
    rb.path('districtId', params.districtId, {});
    rb.query('nameFilter', params.nameFilter, {});
    rb.query('countyFilter', params.countyFilter, {});
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

getOrganizationsByDistrict.PATH = '/organization/district/{districtId}';
