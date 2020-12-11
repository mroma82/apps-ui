import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityPermissionMask } from '../enums/security-permission-mask';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  // new
  constructor(
    private httpClient: AppHttpClientService    
  ) { }

  // check if has entity view
  hasEntityView(entityTypeId: string) : Observable<boolean> {
    return this.httpClient.get(`/entity/${entityTypeId}/hasAccess/${SecurityPermissionMask.View}`);
  }
}
