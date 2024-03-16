/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { District } from '../../models/district';

export interface SearchDistrictByName$Params {
  districtName: string;
}

export function searchDistrictByName(http: HttpClient, rootUrl: string, params: SearchDistrictByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<District>>> {
  const rb = new RequestBuilder(rootUrl, searchDistrictByName.PATH, 'get');
  if (params) {
    rb.query('districtName', params.districtName, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<District>>;
    })
  );
}

searchDistrictByName.PATH = '/district/search';
