import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStatusService {
  private organizationStatus: Record<number, boolean> = {};

  getOrganizationStatus(organizationId: number): boolean {
    return this.organizationStatus[organizationId];
  }

  setOrganizationStatus(organizationId: number, enabled: boolean): void {
    this.organizationStatus[organizationId] = enabled;
  }
}
