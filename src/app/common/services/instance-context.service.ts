import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceContextService {

  // define instance
  instanceId : string;
  instance$ : Observable<any>;
  
  // token
  private token = () => window.localStorage.getItem("apps:token"); 
  
  // init
  constructor(
    httpClient: HttpClient
  ) { 

    // check query string
    let instanceQueryStringParam = "";
    if(location.search) {

      // parse into key, value
      let qs = location.search.substring(1).split('&').map(x => x.split('='));
      qs.forEach(([key, val]) => {

        // check if the instance
        if(key == "i") {
          instanceQueryStringParam = val;
        }
      })
    }

    // check if a query string, pull from there
    if(instanceQueryStringParam) {
      this.instanceId = instanceQueryStringParam;
    }
    
    // else, check if a token
    else if(this.token()) {      

      // parse
      let model = jwt_decode(this.token());
      if(model.instance) {
        this.instanceId = model.instance;        
      }
    }

    // http headers
    const httpHeaders = { 
      headers: new HttpHeaders()
        .set('X-Apps-Instance', this.instanceId ? this.instanceId : "") 
    };

    // set the instance
    this.instance$ = httpClient.get(`${environment.apiUrl}/instance/get`, httpHeaders).pipe(shareReplay(1));
  }
}
