/* tslint:disable */
/* eslint-disable */
import { Account } from '../models/account';
export interface Organization {
  banner?: string;
  county: string;
  description?: string;
  districtId: number;
  id: number;
  logo?: string;
  membersDTO?: Array<Account>;
  name: string;
  ownerId: number;
}
