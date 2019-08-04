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

  // get lines
  getLines(id: string) : Observable<any> {
    return this.http.get(`${this.apiRoot}/getLines/${id}`);
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

  // create from template
  createFromTemplate(templateId: string) : Observable<string> {
    return this.http.post(`${this.apiRoot}/createFromTemplate/${templateId}`, null);
  }

  // copy
  copy(id: string) : Observable<any> {
    return this.http.post(`${this.apiRoot}/copy/${id}`, null);
  }

  // integrate
  integratePurchaseOrder(id: string) : Observable<any> {
    return this.http.post(`${this.apiRoot}/integratePurchaseOrder/${id}`, null);
  }

  // get parameters
  getParameters() : Observable<any> {
    return this.http.get(`${this.apiRoot}/getParameters`);
  }
}
