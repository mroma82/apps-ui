import { Injectable } from '@angular/core';
import { LayoutContextService } from './layout/services/layout-context.service';
import { UserContextService } from './common/services/user-context.service';
import { ToastMessageContextService } from './common/services/toast-message-context.service';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  
  // new
  constructor(
    public Layout: LayoutContextService,
    public User: UserContextService,
    public ToastMessage: ToastMessageContextService
  ) {     

  }
}
