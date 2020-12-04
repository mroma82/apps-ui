import { Injectable } from '@angular/core';


// options
const TOAST_MESSAGE_CLOSE_DELAY_MS = 5000;
const TOAST_MESSAGE_OFFSET_INCREMENT = 10;

@Injectable({
  providedIn: 'root'
})
export class ToastMessageContextService {

  // define stack of messages
  messages: any[] = [];
  offset: number = 0;

  // new
  constructor() { }

  // add
  add(model: any) {

    // build the message
    var message = {
      ...model,
      offset: this.offset,
      isActive: false
    };

    // add to the stack
    this.messages.push(message);

    // setup timers to activate/disable it
    setTimeout(() => message.isActive = true, 100);
    setTimeout(() => message.isActive = false, TOAST_MESSAGE_CLOSE_DELAY_MS);
    setTimeout(() => this.messages.splice(this.messages.indexOf(message), 1), TOAST_MESSAGE_CLOSE_DELAY_MS + 1000);
  }

  // dismiss message
  dismiss(message: any) {
    message.isActive = false;

    if(!this.messages.filter(x => x.isActive).length) {
      this.offset = 0;
    } else {
      //this.offset = Math.max(this.messages.filter(x => x.isActive).map(x => x.offset)) + TOAST_MESSAGE_OFFSET_INCREMENT;
    }
  }
}
