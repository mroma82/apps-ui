import { Injectable } from '@angular/core';


// options
const TOAST_MESSAGE_CLOSE_DELAY_MS = 5000;

@Injectable({
  providedIn: 'root'
})
export class ToastMessageContextService {

  // define stack of messages
  messages: any[] = [];

  // new
  constructor() { }

  // add
  add(model: any) {
    var message = {
      ...model,
      isActive: false
    };

    this.messages.push(message);

    setTimeout(x => message.isActive = true, 100);
    setTimeout(x => message.isActive = false, TOAST_MESSAGE_CLOSE_DELAY_MS);
  }
}
