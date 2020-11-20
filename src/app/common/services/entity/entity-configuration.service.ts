import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityConfigurationService {
  
  rootUrl: string = "";
  
  contextType: number = 0;
  entityTypeId : string = "";
  
  workflow = {
    enabled: false,
    url: ""
  }

  constructor() { }
}
