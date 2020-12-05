import { Component, Injectable } from '@angular/core';

@Injectable()
export class EntityConfigurationService {
  
  // define root url for routing
  rootUrl: string = "";
  name: string = "Record"
  pluralName: string = "Records"

  // entity info
  entityTypeId : string = "";
  
  // workflow
  workflow = {
    enabled: false,
    url: "",
    prefixText: ""
  }

  // forms
  createFormComponent: any;
  viewEditFormComponent: any;
}
