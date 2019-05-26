import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReqApiService {
  readonly apiRoot = "/purchasereq";

  // new
  constructor(
    private http : AppHttpClientService
  ) { }

  // get single
  getSingle(id: string) : Observable<any> {
    return this.http.get(`${this.apiRoot}/getSingle/${id}`);
  }

  // get list filtered
  getListFiltered(model: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}/getListFiltered`, model);
  }  

  // update
  update(model: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}/update`, model);
  }

  // delete
  delete(id: string) : Observable<any> {
    return this.http.post(`${this.apiRoot}/delete/${id}`, null);
  }

  // create
  create(model: any) : Observable<any> {
    return this.http.post(`${this.apiRoot}/create`, model);
  }

  // get parameters
  getParameters() : Observable<any> {
    return this.http.get(`${this.apiRoot}/getParameters`);
  }
}
