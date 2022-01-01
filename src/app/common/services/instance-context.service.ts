import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IInstance } from '../models/instance';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceContextService {

  // define instance
  instanceId: string;
  instance$: Observable<IInstance>;
  licenseStatus$ = new BehaviorSubject<{ status: boolean }>(null);

  // token
  private token = () => window.localStorage.getItem("apps:token");

  // init
  constructor(
    private httpClient: HttpClient
  ) {

    // check query string
    let instanceQueryStringParam = "";
    if (location.search) {

      // parse into key, value
      let qs = location.search.substring(1).split('&').map(x => x.split('='));
      qs.forEach(([key, val]) => {

        // check if the instance
        if (key == "i") {
          instanceQueryStringParam = val;
        }
      })
    }

    // check if a query string, pull from there
    if (instanceQueryStringParam) {
      this.instanceId = instanceQueryStringParam;
    }

    // else, check if a token
    else if (this.token()) {

      // parse
      let model = jwt_decode(this.token());
      if (model.instance) {
        this.instanceId = model.instance;
      }
    }

    // http headers
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.token())
        .set('X-Apps-Instance', this.instanceId ? this.instanceId : "")
    };

    // set the instance
    this.instance$ = httpClient.get<IInstance>(`${environment.apiUrl}/instance/get`, httpHeaders).pipe(shareReplay(1));

    // license status
    this.refreshLicenseStatus();
  }

  // function that refreshes the license status
  refreshLicenseStatus() {

    // http headers
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.token())
        .set('X-Apps-Instance', this.instanceId ? this.instanceId : "")
    };

    // get the status
    this.httpClient.get<boolean>(`${environment.apiUrl}/instance/getLicenseStatus`, httpHeaders).subscribe(x => {
      this.licenseStatus$.next({
        status: x
      });
    });
  }
}
