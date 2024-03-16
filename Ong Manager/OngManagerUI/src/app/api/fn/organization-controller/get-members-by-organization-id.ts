/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Account } from '../../models/account';

export interface GetMembersByOrganizationId$Params {
  id: number;
}

export function getMembersByOrganizationId(http: HttpClient, rootUrl: string, params: GetMembersByOrganizationId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Account>>> {
  const rb = new RequestBuilder(rootUrl, getMembersByOrganizationId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Account>>;
    })
  );
}

getMembersByOrganizationId.PATH = '/organization/{id}/members';
