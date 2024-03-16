/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { District } from '../../models/district';

export interface FindDistrictById$Params {
  id: number;
}

export function findDistrictById(http: HttpClient, rootUrl: string, params: FindDistrictById$Params, context?: HttpContext): Observable<StrictHttpResponse<District>> {
  const rb = new RequestBuilder(rootUrl, findDistrictById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<District>;
    })
  );
}

findDistrictById.PATH = '/district/{id}';
