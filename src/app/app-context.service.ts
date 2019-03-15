import { Injectable } from '@angular/core';
import { LayoutContextService } from './layout/services/layout-context.service';
import { UserContextService } from './common/services/user-context.service';

@Injectable({
  providedIn: 'root'  
})
export class AppContextService {

  // contexts
  Layout: LayoutContextService;
  User: UserContextService;

  // new
  constructor(
    layoutContext: LayoutContextService,
    userContext: UserContextService
  ) { 
    this.Layout = layoutContext;
    this.User = userContext;
  }
}
