import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  // new
  constructor(
    private apiClient : AppHttpClientService
  ) { }

  // get all by context
  getAllByEntity(entityTypeId: string, entityId: string) : Observable<any[]> {
    return this.apiClient.get(`/foundation/notes/getByEntity/${entityTypeId}/${entityId}`);
  }

  // add/update
  addUpdate(note: any) : Observable<any> {
    return this.apiClient.post('/foundation/notes/addUpdate', note);
  }

  // delete
  delete(id: string) : Observable<any> {
    return this.apiClient.post(`/foundation/notes/delete/${id}`, {});
  }
}
