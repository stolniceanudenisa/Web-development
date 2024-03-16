import { Injectable } from '@angular/core';
import { DistrictControllerService } from '../../api/services/district-controller.service';
import { Observable } from 'rxjs';
import { Pageable } from '../../api/models/pageable';
import { PageDistrict } from '../../api/models/page-district';
import { DistrictRegistration } from '../../api/models/district-registration';
import { District } from '../../api/models/district';

@Injectable()
export class DistrictService {
  constructor(private districtControllerService: DistrictControllerService) {}

  public fetchDistrictList(pageable: Pageable): Observable<PageDistrict> {
    return this.districtControllerService.fetchDistrictList({ pageable });
  }

  public addDistrict(body: DistrictRegistration): Observable<District> {
    return this.districtControllerService.registerNewDistrict({ body });
  }

  public editDistrict(body: District) {
    return this.districtControllerService.updateDistrict({ body });
  }

  public deleteDistrict(id: number): Observable<void> {
    return this.districtControllerService.deleteDistrict({ id });
  }
}
