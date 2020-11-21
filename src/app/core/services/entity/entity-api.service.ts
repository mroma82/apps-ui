import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class EntityApiService {

  constructor(
    private api: AppHttpClientService
  ) { }

  list(model: any) : Observable<any> {
    return this.api.post(`/entity/list`, model);
  }

  getSingle(entityTypeId : string, id: string) : Observable<any> {
    return this.api.get(`/entity/get?entityTypeId=${entityTypeId}&id=${id}`);
  }
  
  add(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post("/entity/add", {
      entityTypeId: entityTypeId,
      model: model
    });
  }

  update(entityTypeId : string, model: any) : Observable<any> {
    return this.api.post("/entity/update", {
      entityTypeId: entityTypeId,
      model: model
    });
  }

  delete(entityTypeId : string, id: string) : Observable<any> {
    return this.api.post("/entity/delete", {
      entityTypeId: entityTypeId,
      id: id
    });
  }
}
