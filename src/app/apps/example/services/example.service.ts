import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  // new
  constructor(
    private apiClient : AppHttpClientService
  ) { }  

  create(model) {
    return of(true);
  }
  
  // copy
  copy(id: string) : Observable<any> {
    return this.apiClient.post(`/example/copy/${id}`, null);
  }

  // get parameters
  getParameters() : Observable<any> {
    return this.apiClient.get("/example/getParameters");
  }
}
