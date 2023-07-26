import { Injectable } from '@angular/core';
import { environment } from '@config/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}
  encode(val: string): string {
    return environment.production
      ? window
          .btoa(val)
          .split('')
          .map((l) => this.nextChar(l))
          .join('')
      : val;
  }
  decode(val: string): string {
    return environment.production
      ? window.atob(
          val
            .split('')
            .map((l) => this.prevChar(l))
            .join('')
        )
      : val;
  }
  nextChar(c: string): string {
    return String.fromCharCode(c.charCodeAt(0) + 2);
  }
  prevChar(c: string): string {
    return String.fromCharCode(c.charCodeAt(0) - 2);
  }
}
