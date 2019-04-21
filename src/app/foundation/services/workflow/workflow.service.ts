import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { IContext } from 'src/app/common/models/context';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  // new
  constructor(
    private apiClient: AppHttpClientService
  ) { }

  // init
  init(url: string, contextId: string) : Observable<any> {
    return this.apiClient.get(`${url}/init/${contextId}`);
  }

  // advance
  advance(url: string, instanceId: string, pushModel: any) : Observable<any>  {
    return this.apiClient.post(`${url}/advance/${instanceId}`, pushModel);
  }

  // reject
  reject(url: string, instanceId: string, pushModel: any) : Observable<any>  {
    return this.apiClient.post(`${url}/reject/${instanceId}`, pushModel);
  }

  // reset
  reset(url: string, instanceId: string, taskId: string) : Observable<any>  {
    return this.apiClient.post(`${url}/reset/${instanceId}/${taskId}`, {});
  }
  

  // get instance  
  getInstanceByContext(url: string, context: IContext) : Observable<any> {
    return this.apiClient.get(`${url}/getInstance/${context.contextId}`);
  }

  // get actions
  getActions(id: string) : Observable<any> {
    return this.apiClient.get(`/foundation/workflow/getActions/${id}`);
  }

  // get assigned
  getAssigned(id: string) : Observable<any> {
    return this.apiClient.get(`/foundation/workflow/getAssigned/${id}`);
  }

  // get history
  getHistory(id: string) : Observable<any> {
    return this.apiClient.get(`/foundation/workflow/getHistory/${id}`);
  }
}
