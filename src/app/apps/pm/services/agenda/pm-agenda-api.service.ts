import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppHttpClientService } from '../../../../common/services/app-http-client.service';
import { PmAgendaFilterModel } from '../../models/agenda/pm-agenda-filter-model';

@Injectable({
  providedIn: 'root'
})
export class PmAgendaApiService {

  // new
  constructor(
    private api: AppHttpClientService
  ) { }

  // get the agenda
  getItems(filter: PmAgendaFilterModel): Observable<any> {
    return this.api.post("/pm/getAgenda", filter);
  }
}
