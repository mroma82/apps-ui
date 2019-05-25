import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get vendors
  getVendorList(filter: string) : Observable<any> {
    return this.http.get(`/integration/vendorList?filter=${encodeURIComponent(filter)}`);
  }

  // get customers
  getCustomerList(filter: string) : Observable<any> {
    return this.http.get(`/integration/customerList?filter=${encodeURIComponent(filter)}`);
  }
}
