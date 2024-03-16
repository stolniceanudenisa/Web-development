/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrganizationRegistrationRequest } from '../../models/organization-registration-request';
import { OrganizationRegistrationRequestData } from '../../models/organization-registration-request-data';

export interface CreateNewOrganizationRegistrationRequest$Params {
      body: OrganizationRegistrationRequestData
}

export function createNewOrganizationRegistrationRequest(http: HttpClient, rootUrl: string, params: CreateNewOrganizationRegistrationRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationRegistrationRequest>> {
  const rb = new RequestBuilder(rootUrl, createNewOrganizationRegistrationRequest.PATH, 'post');
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

createNewOrganizationRegistrationRequest.PATH = '/organization/registration-request/create';
