import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqApiService {

  // new
  constructor(
    private http : AppHttpClientService
  ) { }

  // get list filtered
  getListFiltered(model: any) : Observable<any> {
    return this.http.post("/purchasereq/getListFiltered", model);
  }  
}
