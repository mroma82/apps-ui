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
    this.http.get("/subscription/Get");

  // get payment methods
  getPaymentMethods = () =>
    this.http.get("/subscription/GetPaymentMethods");

  // get available products
  getAvailableProducts = () =>
    this.http.get("/subscription/GetAvailableProducts");

  // set default payment method
  setDefaultPaymentMethod = (type: number, id: string) =>
    this.http.post("/subscription/SetDefaultPaymentMethod", {
      paymentMethodType: type,
      paymentMethodId: id
    });

  // remove payment method
  removePaymentMethod = (type: number, id: string) =>
    this.http.post("/subscription/RemovePaymentMethod", {
      paymentMethodType: type,
      paymentMethodId: id
    });

  // update subscription product
  updateProductId = (productId: string) =>
    this.http.post("/subscription/UpdateProduct", {
      productId: productId
    });

  // update subscription license count
  updateLicenseCount = (licenseCount: number) =>
    this.http.post("/subscription/UpdateLicenseCount", {
      licenseCount: licenseCount
    });
}
