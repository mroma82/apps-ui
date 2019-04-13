import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  // new
  constructor(
    private apiClient : AppHttpClientService
  ) { }

  // get list filtered
  getListFiltered(model: any) : Observable<any> {
    return this.apiClient.post("/example/getListFiltered", model);
  }  
}
