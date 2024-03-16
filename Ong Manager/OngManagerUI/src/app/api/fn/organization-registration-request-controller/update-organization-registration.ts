/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrganizationRegistrationRequest } from '../../models/organization-registration-request';

export interface UpdateOrganizationRegistration$Params {
      body: OrganizationRegistrationRequest
}

export function updateOrganizationRegistration(http: HttpClient, rootUrl: string, params: UpdateOrganizationRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationRegistrationRequest>> {
  const rb = new RequestBuilder(rootUrl, updateOrganizationRegistration.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrganizationRegistrationRequest>;
    })
  );
}

updateOrganizationRegistration.PATH = '/organization/registration-request/update';
