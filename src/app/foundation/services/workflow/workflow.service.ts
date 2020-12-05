import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { IEntity } from 'src/app/common/models/context';
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
  init(url: string, entityId: string) : Observable<any> {
    return this.apiClient.get(`${url}/init/${entityId}`);
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

  // cancel
  cancel(url: string, instanceId: string, taskId: string) : Observable<any>  {
    return this.apiClient.post(`${url}/cancel/${instanceId}/${taskId}`, {});
  }
  
  // regenerate
  regenerate(url: string, instanceId: string) : Observable<any>  {
    return this.apiClient.post(`${url}/regenerate/${instanceId}`, {});
  }

  // get instance  
  getInstanceByEntity(url: string, context: IEntity) : Observable<any> {
    return this.apiClient.get(`${url}/getInstance/${context.entityId}`);
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
