import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private apiClient: AppHttpClientService
  ) { }

  // get for user
  getAllForCurrentUser() : Observable<any> {
    return this.apiClient.get("/foundation/notification/getAllForCurrentUser");
  }

  // delete
  delete(id: string) : Observable<any> {
    return this.apiClient.post(`/foundation/notification/delete/${id}`, {});
  }

    // delete
    markAsReadState(id: string, state: boolean) : Observable<any> {
      return this.apiClient.post(`/foundation/notification/setReadState/${id}/${state}`, {});
    }
  
}
