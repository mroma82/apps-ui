import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get types
  getTypes() : Observable<any> {
    return this.http.get("/foundation/listItem/types");
  }

  // get items by type
  getItemsByType(typeId: string) : Observable<any> {
    return this.http.get(`/foundation/listItem/itemsForType/${typeId}`);
  }
}
