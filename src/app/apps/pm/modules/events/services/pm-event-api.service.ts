import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClientService } from '../../../../../common/services/app-http-client.service';

@Injectable()
export class PmEventApiService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // complete
  complete(model: any): Observable<any> {
    return this.http.post("/pm/completeEvent", model);
  }
}
