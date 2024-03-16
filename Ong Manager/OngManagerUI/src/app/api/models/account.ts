/* tslint:disable */
/* eslint-disable */
import { PersonalInformation } from '../models/personal-information';
export interface Account {
  accountDescription?: string;
  email?: string;
  id?: number;
  personalInformationDTO?: PersonalInformation;
  profilePicture?: string;
  role?: string;
}
