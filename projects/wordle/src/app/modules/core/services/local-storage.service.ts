import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  firstTime: string;
  settings: string;
  clear$: Subject<void>;
  constructor() {
    this.firstTime = 'firstTime';
    this.settings = 'settings';
    this.clear$ = new Subject();
  }

  getItem(key: string): any {
    const rawVal = localStorage.getItem(key);
    return rawVal ? JSON.parse(rawVal) : '';
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  clear(): void {
    localStorage.clear();
    this.clear$.next();
  }
}
