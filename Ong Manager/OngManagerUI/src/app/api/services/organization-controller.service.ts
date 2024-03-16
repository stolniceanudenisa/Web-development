/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Account } from '../models/account';
import { addNewOrganizationMember } from '../fn/organization-controller/add-new-organization-member';
import { AddNewOrganizationMember$Params } from '../fn/organization-controller/add-new-organization-member';
import { createNewOrganization } from '../fn/organization-controller/create-new-organization';
import { CreateNewOrganization$Params } from '../fn/organization-controller/create-new-organization';
import { deleteOrganizationById } from '../fn/organization-controller/delete-organization-by-id';
import { DeleteOrganizationById$Params } from '../fn/organization-controller/delete-organization-by-id';
import { editOrganizationInfo } from '../fn/organization-controller/edit-organization-info';
import { EditOrganizationInfo$Params } from '../fn/organization-controller/edit-organization-info';
import { fetchOrganizationList1 } from '../fn/organization-controller/fetch-organization-list-1';
import { FetchOrganizationList1$Params } from '../fn/organization-controller/fetch-organization-list-1';
import { findOrganizationById } from '../fn/organization-controller/find-organization-by-id';
import { FindOrganizationById$Params } from '../fn/organization-controller/find-organization-by-id';
import { getMembersByOrganizationId } from '../fn/organization-controller/get-members-by-organization-id';
import { GetMembersByOrganizationId$Params } from '../fn/organization-controller/get-members-by-organization-id';
import { getOrganizationsByDistrict } from '../fn/organization-controller/get-organizations-by-district';
import { GetOrganizationsByDistrict$Params } from '../fn/organization-controller/get-organizations-by-district';
import { Organization } from '../models/organization';
import { PageOrganization } from '../models/page-organization';

@Injectable({ providedIn: 'root' })
export class OrganizationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `editOrganizationInfo()` */
  static readonly EditOrganizationInfoPath = '/organization/edit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editOrganizationInfo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOrganizationInfo$Response(params: EditOrganizationInfo$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
    return editOrganizationInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editOrganizationInfo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOrganizationInfo(params: EditOrganizationInfo$Params, context?: HttpContext): Observable<Organization> {
    return this.editOrganizationInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Organization>): Organization => r.body)
    );
  }

  /** Path part for operation `createNewOrganization()` */
  static readonly CreateNewOrganizationPath = '/organization/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewOrganization()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewOrganization$Response(params: CreateNewOrganization$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
    return createNewOrganization(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewOrganization$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewOrganization(params: CreateNewOrganization$Params, context?: HttpContext): Observable<Organization> {
    return this.createNewOrganization$Response(params, context).pipe(
      map((r: StrictHttpResponse<Organization>): Organization => r.body)
    );
  }

  /** Path part for operation `addNewOrganizationMember()` */
  static readonly AddNewOrganizationMemberPath = '/organization/add/member';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNewOrganizationMember()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewOrganizationMember$Response(params: AddNewOrganizationMember$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
    return addNewOrganizationMember(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNewOrganizationMember$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNewOrganizationMember(params: AddNewOrganizationMember$Params, context?: HttpContext): Observable<Organization> {
    return this.addNewOrganizationMember$Response(params, context).pipe(
      map((r: StrictHttpResponse<Organization>): Organization => r.body)
    );
  }

  /** Path part for operation `findOrganizationById()` */
  static readonly FindOrganizationByIdPath = '/organization/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOrganizationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrganizationById$Response(params: FindOrganizationById$Params, context?: HttpContext): Observable<StrictHttpResponse<Organization>> {
    return findOrganizationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOrganizationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOrganizationById(params: FindOrganizationById$Params, context?: HttpContext): Observable<Organization> {
    return this.findOrganizationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Organization>): Organization => r.body)
    );
  }

  /** Path part for operation `getMembersByOrganizationId()` */
  static readonly GetMembersByOrganizationIdPath = '/organization/{id}/members';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMembersByOrganizationId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembersByOrganizationId$Response(params: GetMembersByOrganizationId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Account>>> {
    return getMembersByOrganizationId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMembersByOrganizationId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMembersByOrganizationId(params: GetMembersByOrganizationId$Params, context?: HttpContext): Observable<Array<Account>> {
    return this.getMembersByOrganizationId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Account>>): Array<Account> => r.body)
    );
  }

  /** Path part for operation `fetchOrganizationList1()` */
  static readonly FetchOrganizationList1Path = '/organization/get/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchOrganizationList1()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationList1$Response(params: FetchOrganizationList1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganization>> {
    return fetchOrganizationList1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetchOrganizationList1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchOrganizationList1(params: FetchOrganizationList1$Params, context?: HttpContext): Observable<PageOrganization> {
    return this.fetchOrganizationList1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageOrganization>): PageOrganization => r.body)
    );
  }

  /** Path part for operation `getOrganizationsByDistrict()` */
  static readonly GetOrganizationsByDistrictPath = '/organization/district/{districtId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrganizationsByDistrict()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrganizationsByDistrict$Response(params: GetOrganizationsByDistrict$Params, context?: HttpContext): Observable<StrictHttpResponse<PageOrganization>> {
    return getOrganizationsByDistrict(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrganizationsByDistrict$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrganizationsByDistrict(params: GetOrganizationsByDistrict$Params, context?: HttpContext): Observable<PageOrganization> {
    return this.getOrganizationsByDistrict$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageOrganization>): PageOrganization => r.body)
    );
  }

  /** Path part for operation `deleteOrganizationById()` */
  static readonly DeleteOrganizationByIdPath = '/organization/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrganizationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrganizationById$Response(params: DeleteOrganizationById$Params, context?: HttpContext): Observable<StrictHttpResponse<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 EARLY_HINTS' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'>> {
    return deleteOrganizationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOrganizationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrganizationById(params: DeleteOrganizationById$Params, context?: HttpContext): Observable<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 EARLY_HINTS' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'> {
    return this.deleteOrganizationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 EARLY_HINTS' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'>): '100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 EARLY_HINTS' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED' => r.body)
    );
  }

}
