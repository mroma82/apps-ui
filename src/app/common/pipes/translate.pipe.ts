import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  // state
  text: string = null;
  lastCulture: string = null;

  // services
  constructor(
    private localization: LocalizationService
  ) { }

  // trasnform
  transform(key: string): string {

    // check if already a value
    let currentCulture = this.localization.getCulture();
    if (this.text == null || this.lastCulture != currentCulture) {
      // get the value
      this.localization.getString(key).subscribe(x => {
        this.text = x;
      });
      this.lastCulture = currentCulture;
    }
    return this.text;
  }
}
