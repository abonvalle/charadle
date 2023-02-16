import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  firstTime: string = 'firstTime';
  constructor() {}

  getItem(key: string): string {
    const rawVal = localStorage.getItem(key);
    return rawVal ? JSON.parse(rawVal) : '';
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
