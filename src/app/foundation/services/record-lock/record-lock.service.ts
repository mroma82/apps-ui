import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordLockService {
  
  constructor(
    private apiClient : AppHttpClientService
  ) { }

  // check
  check(entityTypeId: string, entityId: string) : Observable<any> {
    return this.apiClient.get(`/foundation/recordlock/check/${entityTypeId}/${entityId}`);
  }

  // set
  set(entityTypeId: string, entityId: string) : void {
    this.apiClient.post(`/foundation/recordlock/set/${entityTypeId}/${entityId}`, {}).subscribe();
  }

  // clear
  clear(entityTypeId: string, entityId: string) : void {
    this.apiClient.post(`/foundation/recordlock/clear/${entityTypeId}/${entityId}`, {}).subscribe();
  }
}
