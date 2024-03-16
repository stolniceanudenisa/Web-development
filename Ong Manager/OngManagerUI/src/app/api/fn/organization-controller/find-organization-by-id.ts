/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Organization } from '../../models/organization';

export interface FindOrganizationById$Params {
  id: number;
}

export function findOrganizationById(http: HttpClient, rootUrl: string, params: FindOrganizationById$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
  const rb = new RequestBuilder(rootUrl, findOrganizationById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Organization>;
    })
  );
}

findOrganizationById.PATH = '/organization/{id}';
