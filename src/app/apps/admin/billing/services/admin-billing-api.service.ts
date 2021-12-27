import { Injectable } from '@angular/core';
import { AppHttpClientService } from '../../../../common/services/app-http-client.service';

@Injectable()
export class AdminBillingApiService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get subscription
  getSubscription = () =>
    this.http.get("/subscription/getSubscription");
}
