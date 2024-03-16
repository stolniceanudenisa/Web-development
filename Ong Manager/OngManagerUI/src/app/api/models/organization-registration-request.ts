/* tslint:disable */
/* eslint-disable */
import { OrganizationDetails } from '../models/organization-details';
export interface OrganizationRegistrationRequest {
  id: number;
  organisationDetails?: OrganizationDetails;
  requesterId: number;
}
