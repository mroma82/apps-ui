import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityConfigurationService {
  
  rootUrl: string = "";
  
  contextType: number = 0;
  entityTypeId : string = "";
  
  // workflow
  workflow = {
    enabled: false,
    url: "",
    prefixText: ""
  }

  // create
  createFormComponent : any;

  constructor() { }
}
