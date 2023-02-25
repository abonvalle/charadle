import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../../../../../package.json';

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
  /**@deprecated */
  OLDgetItem(key: string): any {
    const rawVal = localStorage.getItem(key);
    return rawVal ? JSON.parse(rawVal) : '';
  }
  /**@deprecated */
  OLDsetItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  /**@deprecated */
  clear(): void {
    localStorage.clear();
    this.clear$.next();
  }
  create(key: string, value: string): void {
    localStorage.setItem(this._getVersionedKey(key), value);
  }
  read(key: string): string | null {
    return localStorage.getItem(this._getVersionedKey(key));
  }
  update(key: string, value: string): void {
    localStorage.setItem(this._getVersionedKey(key), value);
  }
  delete(key: string): void {
    localStorage.removeItem(this._getVersionedKey(key));
  }
  private _getVersionedKey(key: string): string {
    return `${key}?v=${this._getMajorVersion()}`;
  }
  private _getMajorVersion(): string {
    return packageJson.version.split('.')[0] ?? '';
  }
}
