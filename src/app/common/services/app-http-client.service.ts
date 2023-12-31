import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InstanceContextService } from './instance-context.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpClientService {

  // tokens
  private token = () => window.localStorage.getItem("apps:token");
  private tokenImpersonated = () => window.localStorage.getItem("apps:token:impersonate");

  // new    
  constructor(
    private httpClient: HttpClient,
    private instanceContext: InstanceContextService
  ) {

  }

  // full url
  public getUrl(path: string): string {
    return environment.apiUrl + path;
  }

  // jwt token with impersonation consideration
  public getJwtToken() {

    // get the correct token
    let token = this.tokenImpersonated();
    if (!token)
      token = this.token();

    return token;
  }

  // get headers
  private getHeaders(token: string): any {

    // init headers
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('X-Apps-Instance', this.instanceContext.instanceId ? this.instanceContext.instanceId : "");

    // check if a language
    let culture = window.localStorage.getItem("apps:culture");
    if (culture) {
      headers = headers.set('Accept-Language', culture);
    }

    // return
    return {
      headers: headers
    };
  }

  // get
  get(path: string): Observable<any> {

    return this.httpClient.get(this.getUrl(path), this.getHeaders(this.getJwtToken()))
      .pipe(
        catchError(err => of(err))
      );
  }

  // get with actual token
  getAsActualUser(path: string): Observable<any> {

    return this.httpClient.get(this.getUrl(path), this.getHeaders(this.token()))
      .pipe(
        catchError(err => of(err))
      );
  }


  // post
  post(url: string, data: any): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data, this.getHeaders(this.getJwtToken()))
      .pipe(
        catchError(err => of({ success: false, response: err }))
      );
  }

  // post with actual token
  postAsActualUser(url: string, data: any): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data, this.getHeaders(this.token()))
      .pipe(
        catchError(err => of({ success: false, response: err }))
      );
  }

  // post blob
  postBlob(url: string, data: any): Observable<any> {

    // build headers
    const headers = {
      ...this.getHeaders(this.getJwtToken()),
      ...{ responseType: 'blob' }
    };

    // post
    return this.httpClient.post(this.getUrl(url), data, headers);
  }
}
