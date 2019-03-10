import { Injectable } from '@angular/core';
import { LayoutContextService } from './layout/services/layout-context.service';

@Injectable({
  providedIn: 'root'  
})
export class AppContextService {

  // contexts
  Layout: LayoutContextService

  // new
  constructor(
    layoutContext: LayoutContextService
  ) { 
    this.Layout = layoutContext;
  }
}
