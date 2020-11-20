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

  // get single
  getSingle(id: string) : Observable<any> {
    return this.apiClient.get(`/example/getSingle/${id}`);
  }

  // get list filtered
  getListFiltered(model: any) : Observable<any> {
    return this.apiClient.post("/example/getListFiltered", model);
  }    

  // update
  update(model: any) : Observable<any> {
    return this.apiClient.post("/example/update", model);
  }

  // delete
  delete(id: string) : Observable<any> {
    return this.apiClient.post(`/example/delete/${id}`, null);
  }

  // create
  create(model: any) : Observable<any> {
    return this.apiClient.post("/example/create", model);
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
