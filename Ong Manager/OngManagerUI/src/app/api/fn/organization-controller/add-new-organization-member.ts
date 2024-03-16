/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MemberRegistration } from '../../models/member-registration';
import { Organization } from '../../models/organization';

export interface AddNewOrganizationMember$Params {
      body: MemberRegistration
}

export function addNewOrganizationMember(http: HttpClient, rootUrl: string, params: AddNewOrganizationMember$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
  const rb = new RequestBuilder(rootUrl, addNewOrganizationMember.PATH, 'post');
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

addNewOrganizationMember.PATH = '/organization/add/member';
