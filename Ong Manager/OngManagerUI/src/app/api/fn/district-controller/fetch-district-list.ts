/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageDistrict } from '../../models/page-district';

export interface FetchDistrictList$Params {
  pageable: Pageable;
}

export function fetchDistrictList(http: HttpClient, rootUrl: string, params: FetchDistrictList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageDistrict>> {
  const rb = new RequestBuilder(rootUrl, fetchDistrictList.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageDistrict>;
    })
  );
}

fetchDistrictList.PATH = '/district/get/all';
