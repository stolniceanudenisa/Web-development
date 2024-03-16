/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createNewOrganizationRegistrationRequest } from '../fn/organization-registration-request-controller/create-new-organization-registration-request';
import { CreateNewOrganizationRegistrationRequest$Params } from '../fn/organization-registration-request-controller/create-new-organization-registration-request';
import { deleteOrganizationRegistrationRequestById } from '../fn/organization-registration-request-controller/delete-organization-registration-request-by-id';
import { DeleteOrganizationRegistrationRequestById$Params } from '../fn/organization-registration-request-controller/delete-organization-registration-request-by-id';
import { fetchOrganizationList } from '../fn/organization-registration-request-controller/fetch-organization-list';
import { FetchOrganizationList$Params } from '../fn/organization-registration-request-controller/fetch-organization-list';
import { fetchOrganizationListByUserId } from '../fn/organization-registration-request-controller/fetch-organization-list-by-user-id';
import { FetchOrganizationListByUserId$Params } from '../fn/organization-registration-request-controller/fetch-organization-list-by-user-id';
import { OrganizationRegistrationRequest } from '../models/organization-registration-request';
import { PageOrganizationRegistrationRequest } from '../models/page-organization-registration-request';
import { updateOrganizationRegistration } from '../fn/organization-registration-request-controller/update-organization-registration';
import { UpdateOrganizationRegistration$Params } from '../fn/organization-registration-request-controller/update-organization-registration';

@Injectable({ providedIn: 'root' })
export class OrganizationRegistrationRequestControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateOrganizationRegistration()` */
  static readonly UpdateOrganizationRegistrationPath = '/organization/registration-request/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrganizationRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrganizationRegistration$Response(params: UpdateOrganizationRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationRegistrationRequest>> {
    return updateOrganizationRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOrganizationRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrganizationRegistration(params: UpdateOrganizationRegistration$Params, context?: HttpContext): Observable<OrganizationRegistrationRequest> {
    return this.updateOrganizationRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganizationRegistrationRequest>): OrganizationRegistrationRequest => r.body)
    );
  }

  /** Path part for operation `createNewOrganizationRegistrationRequest()` */
  static readonly CreateNewOrganizationRegistrationRequestPath = '/organization/registration-request/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewOrganizationRegistrationRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewOrganizationRegistrationRequest$Response(params: CreateNewOrganizationRegistrationRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<OrganizationRegistrationRequest>> {
    return createNewOrganizationRegistrationRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewOrganizationRegistrationRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewOrganizationRegistrationRequest(params: CreateNewOrganizationRegistrationRequest$Params, context?: HttpContext): Observable<OrganizationRegistrationRequest> {
    return this.createNewOrganizationRegistrationRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrganizationRegistrationRequest>): OrganizationRegistrationRequest => r.body)
    );
  }

  /** Path part for operation `fetchOrganizationList()` */
  static readonly FetchOrganizationListPath = '/organization/registration-request/get/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchOrganizationList()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationList$Response(params: FetchOrganizationList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganizationRegistrationRequest>> {
    return fetchOrganizationList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetchOrganizationList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationList(params: FetchOrganizationList$Params, context?: HttpContext): Observable<PageOrganizationRegistrationRequest> {
    return this.fetchOrganizationList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageOrganizationRegistrationRequest>): PageOrganizationRegistrationRequest => r.body)
    );
  }

  /** Path part for operation `fetchOrganizationListByUserId()` */
  static readonly FetchOrganizationListByUserIdPath = '/organization/registration-request/get/all/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchOrganizationListByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationListByUserId$Response(params: FetchOrganizationListByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganizationRegistrationRequest>> {
    return fetchOrganizationListByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetchOrganizationListByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationListByUserId(params: FetchOrganizationListByUserId$Params, context?: HttpContext): Observable<PageOrganizationRegistrationRequest> {
    return this.fetchOrganizationListByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageOrganizationRegistrationRequest>): PageOrganizationRegistrationRequest => r.body)
    );
  }

  /** Path part for operation `deleteOrganizationRegistrationRequestById()` */
  static readonly DeleteOrganizationRegistrationRequestByIdPath = '/organization/registration-request/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrganizationRegistrationRequestById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrganizationRegistrationRequestById$Response(params: DeleteOrganizationRegistrationRequestById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOrganizationRegistrationRequestById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOrganizationRegistrationRequestById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrganizationRegistrationRequestById(params: DeleteOrganizationRegistrationRequestById$Params, context?: HttpContext): Observable<void> {
    return this.deleteOrganizationRegistrationRequestById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
