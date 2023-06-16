import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../../../../../package.json';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  clear$: Subject<void> = new Subject();
  isVersionCtrl: boolean = false;
  constructor() {}
  read(key: string): string | null {
    if (!this.isVersionCtrl) {
      if (!this._checkVersion()) {
        this.clearStorage();
        this.update(localStorageKeys.version, this._getMajorMinorVersion());
        this.isVersionCtrl = true;
        return null;
      }
      this.isVersionCtrl = true;
    }

    const res = localStorage.getItem(key);
    return res ? this._decode(res) : null;
  }
  update(key: string, value: string): void {
    localStorage.setItem(key, this._encode(value));
  }
  delete(key: string): void {
    localStorage.removeItem(key);
  }
  clearStorage(): void {
    this.clear$.next();
    localStorage.clear();
  }
  private _getMajorMinorVersion(): string {
    const v = packageJson.version.split('.');
    v.pop();
    return v.join('.') ?? '';
  }
  private _encode(val: string): string {
    // return val;
    return window
      .btoa(val)
      .split('')
      .map((l) => this._nextChar(l))
      .join('');
  }
  private _decode(val: string): string {
    // return val;
    return window.atob(
      val
        .split('')
        .map((l) => this._prevChar(l))
        .join('')
    );
  }
  private _nextChar(c: string): string {
    return String.fromCharCode(c.charCodeAt(0) + 2);
  }
  private _prevChar(c: string): string {
    return String.fromCharCode(c.charCodeAt(0) - 2);
  }
  private _checkVersion(): boolean {
    const res = localStorage.getItem(localStorageKeys.version);
    if (!res) {
      return false;
    }
    return this._decode(res).split('.')[0] === this._getMajorMinorVersion().split('.')[0];
  }
}
