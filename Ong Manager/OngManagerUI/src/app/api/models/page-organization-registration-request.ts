/* tslint:disable */
/* eslint-disable */
import { OrganizationRegistrationRequest } from '../models/organization-registration-request';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageOrganizationRegistrationRequest {
  content?: Array<OrganizationRegistrationRequest>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
