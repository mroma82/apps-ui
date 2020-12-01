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

  // list results
  list(model: any) : Observable<any> {
    return this.api.post(`/entity/list`, model);
  }

  // get single by id
  getSingleById(entityTypeId : string, id: string) : Observable<any> {
    return this.api.get(`/entity/get?entityTypeId=${entityTypeId}&id=${id}`);
  }

  // get a single record
  getSingle(entityTypeId : string) : Observable<any> {
    return this.api.get(`/entity/getSingle?entityTypeId=${entityTypeId}`);
  }
  
  // add
  add(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post("/entity/add", {
      entityTypeId: entityTypeId,
      model: model
    });
  }

  // update
  update(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post("/entity/update", {
      entityTypeId: entityTypeId,
      model: model
    });
  }

  // delete
  delete(entityTypeId : string, id: string) : Observable<any> {
    return this.api.post("/entity/delete", {
      entityTypeId: entityTypeId,
      id: id
    });
  }
}
