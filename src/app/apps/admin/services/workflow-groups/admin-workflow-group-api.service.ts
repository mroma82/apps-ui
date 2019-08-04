import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminWorkflowGroupApiService {

  // new
  constructor(
    private http: AppHttpClientService
  ) { }

  // get types
  getAll() : Observable<any> {
    return this.http.get("/foundation/workflow/getWorkflowGroups");
  }

  // get type
  getSingle(id: string) : Observable<any> {
    return this.http.get(`/foundation/workflow/getSingleWorkflowGroup/${id}`);
  }

  // update items
  update(model: any) : Observable<boolean> {
    return this.http.post(`/foundation/workflow/updateWorkflowGroup/`, model);
  }
}
