/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Organization } from '../../models/organization';

export interface EditOrganizationInfo$Params {
      body: Organization
}

export function editOrganizationInfo(http: HttpClient, rootUrl: string, params: EditOrganizationInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
  const rb = new RequestBuilder(rootUrl, editOrganizationInfo.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
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

editOrganizationInfo.PATH = '/organization/edit';
