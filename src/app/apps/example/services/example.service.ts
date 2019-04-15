import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable, of } from 'rxjs';

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

  // get status list
  getStatusList() : Observable<any> {
    return of([
      { code: 0, text: "Not started" },
      { code: 1, text: "In Processed" },
      { code: 2, text: "Approved" },
      { code: 3, text: "Completed" }
    ]);
  }

  // update
  update(model: any) : Observable<any> {
    return this.apiClient.post("/example/update", model);
  }

  // delete
  delete(id: string) : Observable<any> {
    return this.apiClient.post(`/example/delete/${id}`, null);
  }
}
