import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable, of, from } from 'rxjs';
import { EntityApiService } from 'src/app/core/services/entity/entity-api.service';
import { ExampleEntityTypes } from '../example-entity-types';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  // new
  constructor(
    private apiClient : AppHttpClientService,
    private entityApi : EntityApiService
  ) { }  
  
  // copy
  copy(id: string) : Observable<any> {
    return this.apiClient.post(`/example/copy/${id}`, null);
  }

  // get parameters
  getParameters() : Observable<any> {
    return this.entityApi.getSingle(ExampleEntityTypes.ExampleParameters);    
  }
}
