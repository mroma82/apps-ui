import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminListItemApiService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get types
  getTypes() : Observable<any> {
    return this.http.get("/foundation/listItem/types");
  }

  // get type
  getType(id: string) : Observable<any> {
    return this.http.get(`/foundation/listItem/type/${id}`);
  }

  // get items by type
  getItemsByType(typeId: string) : Observable<any> {
    return this.http.get(`/foundation/listItem/itemsForType/${typeId}`);
  }

  // update items
  updateItems(typeId: string, items: any[]) : Observable<boolean> {
    return this.http.post(`/foundation/listItem/updateItems/${typeId}`, items);
  }

  // create type
  createType(model: any) : Observable<string> {
    return this.http.post("/foundation/listItem/createType", model);
  }

  // update type
  updateType(model: any) : Observable<boolean> {
    return this.http.post("/foundation/listItem/updateType", model);
  }
}
