import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  // new
  constructor(
    private apiClient : AppHttpClientService
  ) { }

  // get all by context
  getAllByContext(contextType: number, contextId: string) : Observable<any> {
    return this.apiClient.get(`/foundation/auditTrail/getByContext/${contextType}/${contextId}`);
  }

  // get details by parent
  getDetailsByParent(id: string) : Observable<any> {
    return this.apiClient.get(`/foundation/auditTrail/getDetailsByParent/${id}`);
  }
}
