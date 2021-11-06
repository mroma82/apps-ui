import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputFocus]'
})
export class InputFocusDirective {

  constructor(private _el: ElementRef) {

  }

  // init
  ngOnInit(): any {

    // get the elements
    var el = this._el.nativeElement;
    var input: HTMLElement = el.querySelector("input");
    var select: HTMLElement = el.querySelector("select");

    // wait, then focus
    setTimeout(() => {
      if (input != null) {
        input.focus();
      } else if (select != null) {
        select.focus();
      }
    }, 50)
  }
}
