import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  touchStart$: BehaviorSubject<boolean>;
  constructor() {
    this.touchStart$ = new BehaviorSubject<boolean>(false);
  }
  enableTouchStart() {
    !this.touchStart$?.value && this.touchStart$.next(true);
  }
}
