/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteDistrict } from '../fn/district-controller/delete-district';
import { DeleteDistrict$Params } from '../fn/district-controller/delete-district';
import { District } from '../models/district';
import { fetchDistrictList } from '../fn/district-controller/fetch-district-list';
import { FetchDistrictList$Params } from '../fn/district-controller/fetch-district-list';
import { findDistrictById } from '../fn/district-controller/find-district-by-id';
import { FindDistrictById$Params } from '../fn/district-controller/find-district-by-id';
import { PageDistrict } from '../models/page-district';
import { registerNewDistrict } from '../fn/district-controller/register-new-district';
import { RegisterNewDistrict$Params } from '../fn/district-controller/register-new-district';
import { searchDistrictByName } from '../fn/district-controller/search-district-by-name';
import { SearchDistrictByName$Params } from '../fn/district-controller/search-district-by-name';
import { updateDistrict } from '../fn/district-controller/update-district';
import { UpdateDistrict$Params } from '../fn/district-controller/update-district';

@Injectable({ providedIn: 'root' })
export class DistrictControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateDistrict()` */
  static readonly UpdateDistrictPath = '/district/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDistrict()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDistrict$Response(params: UpdateDistrict$Params, context?: HttpContext): Observable<StrictHttpResponse<District>> {
    return updateDistrict(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDistrict$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDistrict(params: UpdateDistrict$Params, context?: HttpContext): Observable<District> {
    return this.updateDistrict$Response(params, context).pipe(
      map((r: StrictHttpResponse<District>): District => r.body)
    );
  }

  /** Path part for operation `registerNewDistrict()` */
  static readonly RegisterNewDistrictPath = '/district/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerNewDistrict()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewDistrict$Response(params: RegisterNewDistrict$Params, context?: HttpContext): Observable<StrictHttpResponse<District>> {
    return registerNewDistrict(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerNewDistrict$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerNewDistrict(params: RegisterNewDistrict$Params, context?: HttpContext): Observable<District> {
    return this.registerNewDistrict$Response(params, context).pipe(
      map((r: StrictHttpResponse<District>): District => r.body)
    );
  }

  /** Path part for operation `findDistrictById()` */
  static readonly FindDistrictByIdPath = '/district/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findDistrictById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDistrictById$Response(params: FindDistrictById$Params, context?: HttpContext): Observable<StrictHttpResponse<District>> {
    return findDistrictById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findDistrictById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findDistrictById(params: FindDistrictById$Params, context?: HttpContext): Observable<District> {
    return this.findDistrictById$Response(params, context).pipe(
      map((r: StrictHttpResponse<District>): District => r.body)
    );
  }

  /** Path part for operation `searchDistrictByName()` */
  static readonly SearchDistrictByNamePath = '/district/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchDistrictByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchDistrictByName$Response(params: SearchDistrictByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<District>>> {
    return searchDistrictByName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchDistrictByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchDistrictByName(params: SearchDistrictByName$Params, context?: HttpContext): Observable<Array<District>> {
    return this.searchDistrictByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<District>>): Array<District> => r.body)
    );
  }

  /** Path part for operation `fetchDistrictList()` */
  static readonly FetchDistrictListPath = '/district/get/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetchDistrictList()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchDistrictList$Response(params: FetchDistrictList$Params, context?: HttpContext): Observable<StrictHttpResponse<PageDistrict>> {
    return fetchDistrictList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetchDistrictList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fetchDistrictList(params: FetchDistrictList$Params, context?: HttpContext): Observable<PageDistrict> {
    return this.fetchDistrictList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageDistrict>): PageDistrict => r.body)
    );
  }

  /** Path part for operation `deleteDistrict()` */
  static readonly DeleteDistrictPath = '/district/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDistrict()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDistrict$Response(params: DeleteDistrict$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDistrict(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDistrict$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDistrict(params: DeleteDistrict$Params, context?: HttpContext): Observable<void> {
    return this.deleteDistrict$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
