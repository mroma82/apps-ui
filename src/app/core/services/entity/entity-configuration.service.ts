import { Component, Injectable } from '@angular/core';

@Injectable()
export class EntityConfigurationService {
  
  // define root url for routing
  rootUrl: string = "";
  
  // entity info
  contextType: number = 0; // obsolete
  entityTypeId : string = "";
  
  // workflow
  workflow = {
    enabled: false,
    url: "",
    prefixText: ""
  }

  // forms
  createFormComponent: Component;
  viewEditFormComponent: Component;
}
