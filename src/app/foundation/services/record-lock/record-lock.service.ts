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
  check(contextType: number, contextId: string) : Observable<any> {
    return this.apiClient.get(`/foundation/recordlock/check/${contextType}/${contextId}`);
  }

  // set
  set(contextType: number, contextId: string) : void {
    this.apiClient.post(`/foundation/recordlock/set/${contextType}/${contextId}`, {}).subscribe();
  }

  // clear
  clear(contextType: number, contextId: string) : void {
    this.apiClient.post(`/foundation/recordlock/clear/${contextType}/${contextId}`, {}).subscribe();
  }
}
