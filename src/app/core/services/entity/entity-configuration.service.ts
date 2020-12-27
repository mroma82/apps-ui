import { Component, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EntityConfigurationService {
  
  // define root url for routing
  rootUrl: string = "";
  name: string = "Record"
  pluralName: string = "Records"

  // entity info
  entityTypeId : string = "";

  // define record description
  recordDescription(model: any) : string {
    return model.id;
  }
  
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
