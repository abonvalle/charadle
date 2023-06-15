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
        localStorage.clear();
        this.update(localStorageKeys.version, this._getMajorVersion());
        this.isVersionCtrl = true;
        return null;
      }
      this.isVersionCtrl = true;
    }

    const res = localStorage.getItem(this._getVersionedKey(key));
    return res ? this._decode(res) : null;
  }
  update(key: string, value: string): void {
    localStorage.setItem(this._getVersionedKey(key), this._encode(value));
  }
  delete(key: string): void {
    localStorage.removeItem(this._getVersionedKey(key));
  }
  clearStorage(): void {
    this.clear$.next();
    localStorage.clear();
  }
  private _getVersionedKey(key: string): string {
    return `${key}?v=${this._getMajorVersion()}`;
  }
  private _getMajorVersion(): string {
    return packageJson.version.split('.')[0] ?? '';
  }
  private _encode(val: string): string {
    return val; //! todo remove for build
    return window
      .btoa(val)
      .split('')
      .map((l) => this._nextChar(l))
      .join('');
  }
  private _decode(val: string): string {
    return val; //! todo remove for build
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
    const res = localStorage.getItem(this._getVersionedKey(localStorageKeys.version));
    if (!res) {
      return false;
    }
    return this._decode(res) === this._getMajorVersion();
  }
}
