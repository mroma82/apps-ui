import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppHttpClientService {

  constructor(
    private httpClient: HttpClient
  ) { 

  }

  // full url
  public getUrl(path: string) : string {
    return environment.apiUrl + path;
  }
  
  // jwt token
  private getJwtToken() {
    let token = localStorage.getItem('apps:token');
    return 'Bearer ' + token;
  }  

  // get headers
  private getHeaders() : any {
    return { 
      headers: new HttpHeaders().set('Authorization', this.getJwtToken()) 
    };
  }

  // get
  get(path: string) : Observable<any> {

    return this.httpClient.get(this.getUrl(path), this.getHeaders())
      .pipe(        
        catchError(err => of(err)) 
      );
  }


  // post
  post(url: string, data: any) : Observable<any> {    
    return this.httpClient.post(this.getUrl(url), data, this.getHeaders())
      .pipe(        
        catchError(err => of({ success: false,  response: err})) 
      );
  }

}
