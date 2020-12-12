import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EntityApiService {

  // new
  constructor(
    private api: AppHttpClientService
  ) { }

  // get all types
  getTypes() : Observable<any> {
    return this.api.get("/entityType/getAll");
  }
  
  // list results
  list(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post(`/entity/${entityTypeId}/list`, model);
  }

  // get single by id
  getSingleById(entityTypeId : string, id: string) : Observable<any> {
    return this.api.get(`/entity/${entityTypeId}/get/${id}`);
  }

  // get a single record
  getSingle(entityTypeId : string) : Observable<any> {
    return this.api.get(`/entity/${entityTypeId}/single`);
  }
  
  // add
  add(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post(`/entity/${entityTypeId}/add`, model);
  }

  // update
  update(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post(`/entity/${entityTypeId}/update`, model);
  }

  // delete
  delete(entityTypeId : string, id: string) : Observable<any> {
    return this.api.post(`/entity/${entityTypeId}/delete/${id}`, null);
  }

  // has access
  hasAccess(entityTypeId : string, permissionsMask: number) : Observable<boolean> {
    return this.api.get(`/entity/${entityTypeId}/hasAccess/${permissionsMask}`);
  }
}
